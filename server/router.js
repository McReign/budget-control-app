const Router = require('koa-router');

const mustBeAuthenticated = require('./middlewares/mustBeAuthenticated');
const mustBeWalletOwner = require('./middlewares/mustBeWalletOwner');

const getCategoriesByUser = require('./controllers/getCategoriesByUser');
const getCategoriesByWallet = require('./controllers/getCategoriesByWallet');
const register = require('./controllers/register');
const login = require('./controllers/login');
const logout = require('./controllers/logout');
const setWalletBalance = require('./controllers/setWalletBalance');
const addOperation = require('./controllers/addOperation');
const me = require('./controllers/me');
const getWallets = require('./controllers/getWallets');
const getOperations = require('./controllers/getOperations');
const getNotifications = require('./controllers/getNotifications');
const closeNotification = require('./controllers/closeNotification');
const inviteToWallet = require('./controllers/inviteToWallet');
const acceptInvitation = require('./controllers/acceptInvitation');
const cancelInvitation = require('./controllers/cancelInvitation');
const addCategory = require('./controllers/addCategory');
const getUsers = require('./controllers/getUsers');

const router = new Router({ prefix: '/api' });

router.get('/categories', mustBeAuthenticated, getCategoriesByWallet, getCategoriesByUser);
router.get('/users', mustBeAuthenticated, getUsers);
router.get('/users/me', mustBeAuthenticated, me);
router.get('/wallets', mustBeAuthenticated, getWallets);
router.get('/wallets/:walletId/operations', mustBeAuthenticated, mustBeWalletOwner, getOperations);
router.get('/notifications', mustBeAuthenticated, getNotifications);

router.post('/users/register', register);
router.post('/users/login', login);
router.post('/users/logout', mustBeAuthenticated, logout);
router.post('/categories/add', mustBeAuthenticated, addCategory);
router.post('/wallets/:walletId/balance', mustBeAuthenticated, mustBeWalletOwner, setWalletBalance);
router.post('/wallets/:walletId/operations', mustBeAuthenticated, mustBeWalletOwner, addOperation);
router.post('/wallets/:walletId/invite', mustBeAuthenticated, mustBeWalletOwner, inviteToWallet);
router.post('/notifications/:notificationId/close', mustBeAuthenticated, closeNotification);
router.post('/invitations/:invitationId/accept', mustBeAuthenticated, acceptInvitation);
router.post('/invitations/:invitationId/cancel', mustBeAuthenticated, cancelInvitation);

module.exports = router;