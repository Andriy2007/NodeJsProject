import { Request, Response, NextFunction } from 'express';

import {RoleEnum} from "../enums/role.enum";


export function isAdmin(req: Request, res: Response, next: NextFunction) {
    const user = req.params;
    if (user && user.role === RoleEnum.ADMIN) {
        next();
    } else {
        res.status(403).send('Доступ заборонено');
    }
}

export function isManager(req: Request, res: Response, next: NextFunction) {
    const user = req.params;
    if (user && user.role === RoleEnum.Manager) {
        next();
    } else {
        res.status(403).send('Доступ заборонено');
    }
}

export function isSeller(req: Request, res: Response, next: NextFunction) {
    const user = req.params;
    if (user && user.role === RoleEnum.Seller) {
        next();
    } else {
        res.status(403).send('Доступ заборонено');
    }
}

export function isBuyer(req: Request, res: Response, next: NextFunction) {
    const user = req.params;
    if (user && user.role === RoleEnum.Buyer) {
        next();
    } else {
        res.status(403).send('Доступ заборонено');
    }
}

export function isSub(req: Request, res: Response, next: NextFunction) {
    const user = req.params;
    if (user && user.subscription === 'Vip') {
        next();
    } else {
        res.status(403).send('Доступ заборонено');
    }
}