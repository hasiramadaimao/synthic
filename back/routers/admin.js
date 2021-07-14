const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const cred = path.resolve(__dirname, './credencial.json');
const fse = require('fs-extra')

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = {
      username,
      password
    };
    fs.readFile(cred, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send({
          success: false,
          message: 'Error reading credentials file'
        });
      } else {
        const { username, password } = JSON.parse(data);
        if (username === user.username && password === user.password) {
          res.send({
            success: true
          });
        } else {
          res.send({
            success: false
          });
        }
      }
    })
  } catch (e) {
    return res.status(500).json({
      success: false,
      error: e.message
    })
  }
});

router.get('/getDays', (req, res) => {
  try {

    const dir = `./public/static/`;

    fse.ensureDir(dir)
      .then((response) => {
        fs.readdir(path.resolve(__dirname, '../public/static'), (err, files) => {
          if (err) {
            console.log(err)
            return res.status(500).send({
              success: false,
              message: 'Error reading days directory'
            });
          } else {
            console.log(files)
            return res.send({
              success: true,
              items: files
            });
          }
        });
      }).catch((e) => {
        return res.status(500).json({
          success: false,
          error: e.message
        })
      })

  } catch (e) {
    console.log(e)
    return res.status(500).json({
      success: false,
      error: e.message
    })
  }
})

router.get('/getFiles', (req, res) => {
  try {
    let { day } = req.query;
    let dir = path.resolve(__dirname, `../public/static/${day}`)
    if (day) {
      fs.readdir(dir, (err, files) => {
        if (err) {
          return res.status(500).send({
            success: false,
            message: 'Error reading files directory'
          });
        } else {
          return res.send({
            success: true,
            files: files
          });
        }
      });
    } else {
      return res.status(500).send({
        success: false,
        message: 'Error reading files directory'
      });
    }
  } catch (e) {
    console.log(e.message)
    return res.status(500).json({
      success: false,
      error: e.message
    })
  }
})

module.exports = router;
