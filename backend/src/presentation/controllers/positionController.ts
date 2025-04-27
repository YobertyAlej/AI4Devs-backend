import { Request, Response } from 'express';
import { getPositionCandidatesService } from '../../application/services/positionService';

export const getPositionCandidates = async (req: Request, res: Response) => {
    try {
        const positionId = parseInt(req.params.id);
        
        if (isNaN(positionId)) {
            return res.status(400).json({ error: 'Invalid position ID format' });
        }
        
        const candidates = await getPositionCandidatesService(positionId);
        
        if (!candidates) {
            return res.status(404).json({ error: 'Position not found or no candidates available' });
        }
        
        res.json(candidates);
    } catch (error) {
        console.error('Error fetching position candidates:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}; 