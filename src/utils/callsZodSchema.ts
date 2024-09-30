import { z } from "zod";

const callRecordSchema = z.object({
    id: z.string().length(32, { message: "ID должен состоять из 32 символов" }),
    type: z.enum(['outgoing', 'incoming'], {
        errorMap: () => ({ message: "Тип звонка должен быть 'outgoing' или 'incoming'" })
    }),
    state: z.enum(["accepted", "missed"], {
        errorMap: () => ({ message: "Состояние звонка должен быть 'accepted' или 'missed'" })
    }),
    status: z.enum(["callback", "completed_refuse", "transfer", "completed_success"], {
        errorMap: () => ({ message: "Статус звонка должен быть 'callback', 'transfer', 'completed_success' или 'completed_refuse'" })
    }),
    callMood: z.enum(["positive", "negative", "neutral"], {
        errorMap: () => ({ message: "callMood звонка должен быть 'positive', 'negative' или 'neutral'" })
    }),
    agentComment: z.string().optional(),
    feedbackScore: z.number().min(0).max(5),
    followUpRequired: z.boolean(),
    recordUrl: z.string().optional(),
    clientId: z.string().length(32, { message: "ID должен состоять из 32 символов" }),
    employeeId: z.string().length(32, { message: "ID должен состоять из 32 символов" }),
    start: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid start date format",
    }),
    end: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid end date format",
    }),
    duration: z.number().positive(),
});


export const callRecordsSchema = z.array(callRecordSchema);

export type CallRecords = z.infer<typeof callRecordsSchema>;