import {ticketsModel} from '../models/ticket.model.js';
import BaseManager from './baseManager.js';

class TicketsManager extends BaseManager{
    constructor() {
        super(ticketsModel);
    }
}

export const ticketsManager = new TicketsManager();