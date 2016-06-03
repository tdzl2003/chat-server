/**
 * Created by tdzl2003 on 3/7/16.
 */

import { sync as createUid } from 'uid-safe';
import Router from 'koa-router';
import { User, Relation, Request } from '../../models';
import { checkLogined, createLoginToken } from '../modules/user';
import StatusError from '../utils/StatusError';

import {getAvatarUrl} from '../modules/user';

const router = new Router();



export default router;
