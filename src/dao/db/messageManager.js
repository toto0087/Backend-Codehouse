import {messagesModel} from '../models/messages.model.js';
import BaseManager from './baseManager.js';

class MessageManager extends BaseManager{
    constructor() {
        super(messagesModel);
    }
}

export const messageManager = new MessageManager();
