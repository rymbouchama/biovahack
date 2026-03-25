import { Router } from 'express';
import Joi from 'joi';
import prisma from '../lib/prisma';
import { authenticateAdmin, AdminAuthRequest } from '../middleware/adminAuth';

const router = Router();

const domainValues = ['biotech', 'tech', 'business'] as const;

const memberCreateSchema = Joi.object({
  name: Joi.string().min(1).required(),
  title: Joi.string().min(1).required(),
  description: Joi.string().min(1).required(),
  imageUrl: Joi.string().uri().required(),
  domain: Joi.string().valid(...domainValues).required(),

  githubUrl: Joi.string().uri().optional().allow(null, ''),
  twitterUrl: Joi.string().uri().optional().allow(null, ''),
  linkedinUrl: Joi.string().uri().optional().allow(null, ''),
});

const memberUpdateSchema = Joi.object({
  name: Joi.string().min(1).optional(),
  title: Joi.string().min(1).optional(),
  description: Joi.string().min(1).optional(),
  imageUrl: Joi.string().uri().optional(),
  domain: Joi.string().valid(...domainValues).optional(),

  githubUrl: Joi.string().uri().optional().allow(null, ''),
  twitterUrl: Joi.string().uri().optional().allow(null, ''),
  linkedinUrl: Joi.string().uri().optional().allow(null, ''),
}).min(1);

router.get('/', async (req, res, next) => {
  try {
    const members = await prisma.juryMember.findMany({
      orderBy: { createdAt: 'asc' },
    });
    res.json({ success: true, data: members });
  } catch (err) {
    next(err);
  }
});

router.post('/', authenticateAdmin, async (req: AdminAuthRequest, res, next) => {
  try {
    const { error, value } = memberCreateSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, error: error.details[0].message });

    const member = await prisma.juryMember.create({
      data: {
        name: value.name,
        title: value.title,
        description: value.description,
        imageUrl: value.imageUrl,
        domain: value.domain,

        githubUrl: value.githubUrl || null,
        twitterUrl: value.twitterUrl || null,
        linkedinUrl: value.linkedinUrl || null,
      },
    });

    res.status(201).json({ success: true, data: member });
  } catch (err) {
    next(err);
  }
});

router.put('/:id', authenticateAdmin, async (req: AdminAuthRequest, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ success: false, error: 'Invalid id' });

    const { error, value } = memberUpdateSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, error: error.details[0].message });

    // Build prisma update payload (convert empty strings to null)
    const data: any = { ...value };
    if (data.githubUrl === '') data.githubUrl = null;
    if (data.twitterUrl === '') data.twitterUrl = null;
    if (data.linkedinUrl === '') data.linkedinUrl = null;

    const member = await prisma.juryMember.update({
      where: { id },
      data,
    });

    res.json({ success: true, data: member });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', authenticateAdmin, async (req: AdminAuthRequest, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ success: false, error: 'Invalid id' });

    await prisma.juryMember.delete({ where: { id } });
    res.json({ success: true, data: { id } });
  } catch (err) {
    next(err);
  }
});

export default router;