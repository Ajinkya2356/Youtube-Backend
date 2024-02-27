import { Router } from 'express'
import { changeCurrentUserPassword, getCurrentUser, getUserChannelProfile, getUserWatchHistory, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetails, updateUserAvatar, updateUserCoverImage } from '../controllers/user.controller.js'
import { upload } from '../middlewares/multer.middleware.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'
const router = Router()
router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }, {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser)
router.route("/login").post(
    loginUser
)
router.route("/logout").post(
    verifyJWT,
    logoutUser
)
router.route("/refresh-token").post(
    refreshAccessToken
)
router.route("/changePassword").post(
    verifyJWT,
    changeCurrentUserPassword
)
router.route("/user").get(
    verifyJWT,
    getCurrentUser
)
router.route("/updateAccount").patch(
    verifyJWT,
    updateAccountDetails
)
router.route("/updateAvatar").patch(
    verifyJWT,
    upload.single("avatar"),
    updateUserAvatar
)
router.route("/updateCoverImage").patch(
    verifyJWT,
    upload.single("coverImage"),
    updateUserCoverImage
)
router.route("/channel/:username").get(
    verifyJWT,
    getUserChannelProfile,
)
router.route("/watchHistory").get(
    verifyJWT,
    getUserWatchHistory
)
export default router