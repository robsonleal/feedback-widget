import express from 'express';
import { prisma } from './prisma';
import nodemailer from 'nodemailer';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feedbacks-repository';
export const routes = express.Router();

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "af253fdcbe77c8",
      pass: "348aeb629210a7"
    }
});

routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body

    const prismaFeedbacksRepository = new PrismaFeedbackRepository();
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbacksRepository
    );

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot
    });

    // await transport.sendMail({
    //     from: 'Equipe Feedget <oi@feedget.com>',
    //     to: 'Robson Leal <rrobson9@gmail.com>',
    //     subject: 'Novo feedback',
    //     html: [
    //         `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
    //         `<p>Tipo do feedback: ${type}</p>`,
    //         `<p>Comentário: ${comment}</p>`,
    //         `</div>`
    //     ].join('\n')
    // });

    return res.status(201).send();
})