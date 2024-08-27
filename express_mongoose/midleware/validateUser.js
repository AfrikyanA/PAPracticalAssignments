import { body, validationResult} from 'express-validator';

export const validateUser = (name, email, age) => {
    return [
        body('name').isAlpha().withMessage('Name must contains only letters (a-zA-Z).').isLength({ min: 3}).withMessage('Name must have >3 characters'),
        body('email').isEmail().withMessage('Invalid email address'),
        body('age').isInt({ min: 0, max: 120 }).withMessage('Age must be a number between 0 and 120.'),
    
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        }
    ];
};