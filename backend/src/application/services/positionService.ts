import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CandidateWithStageAndScore {
    id: number;
    fullName: string;
    current_interview_step: string;
    averageScore: number | null;
}

export const getPositionCandidatesService = async (positionId: number): Promise<CandidateWithStageAndScore[]> => {
    try {
        // Find all applications for the given position
        const applications = await prisma.application.findMany({
            where: {
                positionId: positionId
            },
            include: {
                candidate: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true
                    }
                },
                interviewStep: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                interviews: {
                    select: {
                        score: true
                    }
                }
            }
        });

        // Map the applications to the required format
        const candidatesWithStageAndScore = applications.map(application => {
            // Calculate average score from interviews
            const scores = application.interviews
                .map(interview => interview.score)
                .filter((score): score is number => score !== null && score !== undefined);
            
            const averageScore = scores.length > 0
                ? scores.reduce((sum, score) => sum + score, 0) / scores.length
                : null;

            return {
                id: application.candidate.id,
                fullName: `${application.candidate.firstName} ${application.candidate.lastName}`,
                current_interview_step: application.interviewStep.name,
                averageScore
            };
        });

        return candidatesWithStageAndScore;
    } catch (error) {
        console.error('Error fetching position candidates:', error);
        throw new Error('Failed to fetch position candidates');
    }
}; 