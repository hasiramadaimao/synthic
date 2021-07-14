const router = require('express').Router();
const fse = require('fs-extra');
const fs = require('fs');

router.post('/saveData', async (req, res) => {
  try {
    console.log(req.body)
    const { img } = req.body;
    const timeStamp = new Date().getTime();
    const todayDate = new Date();
    let thatDay = todayDate.toDateString()
    thatDay = thatDay.split(' ').join("-");

    const dir = `./public/static/${thatDay}`;
    const fileName = `${timeStamp}`;
    const filePath = `${dir}/${fileName}.jpg`;

    fse.ensureDir(dir)
      .then(() => {
        fs.writeFile(filePath, img, 'base64', (err) => {
          if (err) {
            console.log(err);
          }
        })
      })
      .catch(e => {
        console.log(e);
      })
    return res.json({
      status: 'success',
      message: 'Saved successfully',
    });
  } catch (e) {
    return res.json({
      success: false,
      message: e.message
    });
  }
})

module.exports = router;