const router = require("express").Router();
const validate = require("../validate");
const hash = require("../hashing");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 40 * 1000,
  max: 3
})

/* GET home page. */
router.get('/', limiter, function (req, res, next) {
  res.json({
    Home: "Welcome to hashing API Created By YsnIrix",
    Usage: "To Hash you string add /hash/YourStringHere",
    Note: "For better view use the JSON Formater extention => https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa"
  });
});

router.get('/hash', function (req, res, next) {
  res.status(403).json({
    error: {
      message: "Access Denied"
    }
  })
});

router.get('/hash/:value', limiter, function (req, res, next) {
  //if(req.params.value !== null) return res.status(400).send('error');
  const {
    error
  } = validate({
    input: req.params.value
  });
  if (error) return res.status(400).json({
    error: {
      message: error.details[0].message
    }
  });

  try {
    const result = hash(req.params.value);
    res.json(result);
  } catch (error) {
    res.status(400).json({
      error: {
        message: "Unknown Error"
      }
    });
  }
});

module.exports = router;