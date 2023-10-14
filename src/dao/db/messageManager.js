import {messageModel} from '../models/messages.model.js';
import BaseManager from './baseManager.js';

class MessageManager extends BaseManager{
    constructor() {
        super(messageModel);
    }
}

export const messageManager = new MessageManager();
