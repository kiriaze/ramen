const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config'); // package for access to config/ dir
const { check, validationResult } = require('express-validator');

//
const auth = require('../middleware/auth');

// Models
const User = require('../models/User');

// @route    GET api/users
// @desc     Get all users
// @access   Public
router.get('/', async (req, res) => {
	try {
		let users = await User.find().select('-password');
		res.json(users);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    POST api/users
// @desc     Register User
// @access   Public
router.post(
	'/',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'An email is required').isEmail(),
		check(
			'password',
			'Please enter a password with 6 or more characters'
		).isLength({
			min: 6
		})
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array()
			});
		}

		const { name, email, password } = req.body;

		try {
			// check if user exist
			let user = await User.findOne({ email });

			if (user) {
				return res.status(400).json({
					errors: [
						{
							msg: 'User already exists'
						}
					]
				});
			}

			const avatar = gravatar.url(email, {
				s: '200',
				r: 'pg',
				d: 'mm'
			});

			user = new User({
				name,
				email,
				avatar,
				password
			});

			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();

			const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{
					expiresIn: 360000
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route    DELETE api/users
// @desc     Delete User
// @access   Private
router.delete('/', auth, async (req, res) => {
	try {
		// Remove users Posts
		await Post.deleteMany({
			user: req.user.id
		});

		// Remove user
		await User.findOneAndRemove({
			_id: req.user.id
		});

		res.json({
			msg: 'User deleted'
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
