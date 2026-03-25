import { Router } from 'express';
import Joi from 'joi';
import prisma from '../lib/prisma';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = Router();
type TeammateInput = {
  name: string;
  email: string;
  role: string;
};

const registerSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  university: Joi.string().required(),
  major: Joi.string().required(),
  portfolioUrl: Joi.string().uri().optional(),
  linkedin: Joi.string().uri().optional(),
  phone: Joi.string().required(),
  socialPlatform: Joi.string().valid('facebook', 'instagram').optional(),
  socialHandle: Joi.string().optional(),
  hasTeammates: Joi.boolean().required(),
  teammates: Joi.array().items(Joi.object({
    name: Joi.string().trim().min(1).required(),
    email: Joi.string().email().required(),
    role: Joi.string().required(),
  
  })).optional(),
});

router.post('/admin-login', async (req, res) => {
  try {
    const { email, password } = req.body as { email: string; password: string };

    if (!email || !password) {
      return res.status(400).json({ success: false, error: { message: 'email and password are required' } });
    }

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) return res.status(401).json({ success: false, error: { message: 'Invalid credentials' } });

    const ok = await bcrypt.compare(password, admin.passwordHash);
    if (!ok) return res.status(401).json({ success: false, error: { message: 'Invalid credentials' } });

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET not configured');

    const accessToken = jwt.sign(
      { adminId: admin.id, role: admin.role },
      secret,
      { expiresIn: '1d' }
    );

    return res.status(200).json({ success: true, accessToken });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: { message: 'Internal server error' } });
  }
});


router.post('/register', async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const existing = await prisma.user.findUnique({
      where: { email: value.email }
    });

    if (existing) {
      return res.status(409).json({ error: 'User already exists' });
    }

    

let teamId: number | null = null;

// 🔥 2. ICI → CHECK INVITE
console.log("Incoming email:", value.email);

const invite = await prisma.teammate.findFirst({
  where: { email: value.email }
});

console.log("Invite found:", invite);

if (invite) {
  const creator = await prisma.user.findUnique({
    where: { id: invite.userId }
  });

  console.log("Creator:", creator);

  if (creator?.teamId) {
    teamId = creator.teamId;
    console.log("Assigned teamId:", teamId);
  }
}


if (!teamId && value.hasTeammates) {
  const team = await prisma.team.create({ data: {} });
  teamId = team.id;
  console.log("Created new team:", teamId);
}


const user = await prisma.user.create({
  data: {
    fullName: value.fullName,
    email: value.email,
    university: value.university,
    major: value.major,
    portfolioUrl: value.portfolioUrl,
    linkedin: value.linkedin,
    phone: value.phone,
    socialPlatform: value.socialPlatform,
    socialHandle: value.socialHandle,
    teamId: teamId, // 🔥 ici
  },
});


if (value.hasTeammates && value.teammates?.length > 0) {
  await prisma.teammate.createMany({
    data: value.teammates.map((t: TeammateInput) => ({
      name: t.name,
      email: t.email,
      role: t.role,
      userId: user.id,
    })),
  });
}

    res.status(201).json({
      message: 'User registered successfully',
      userId: user.id,
      teamId: teamId
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;