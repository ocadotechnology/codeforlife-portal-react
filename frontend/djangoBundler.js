const Bundler = require('parcel-bundler')
const Path = require('path')
const fs = require('fs')
const Handlebars = require('handlebars')

const file = Path.join(__dirname, './public/index.html')
const outDir = Path.join(__dirname, '../backend/portal/static/react')

const options = {
  outDir,
  outFile: 'index.html',
  publicUrl: '/static/react/',
  watch: process.env.NODE_ENV !== 'production',
  //minify: process.env.NODE_ENV === 'production',
  target: 'browser',
  //cache: process.env.NODE_ENV === 'production',
}

const templateFolder = Path.resolve(Path.join(__dirname, '../backend/portal/templates'))
const handlebarsTemplatePath = Path.resolve(
  Path.join(__dirname, './public/handlebars_template.html')
)

const bundler = new Bundler(file, options)

function getHashedFileName(indexHtml, fileName, fileType) {
  return new RegExp(`"/static/react/(${fileName}\\..*\\.${fileType})"`).exec(indexHtml)[1];
}

Handlebars.registerHelper('if_eq', function (a, b, opts) {
  if (a === b) {
    return opts.fn(this)
  } else {
    return opts.inverse(this)
  }
})

function generateHTML(
  faviconFileName,
  srcFileName,
  spaceGroteskFontFileName,
  interFontFileName
) {
  const templateString = fs.readFileSync(handlebarsTemplatePath, 'utf-8')
  const template = Handlebars.compile(templateString)
  return template({
    faviconUrl: `react/${faviconFileName}`,
    reactUrl: `react/${srcFileName}`,
    spaceGroteskFontUrl: `react/${spaceGroteskFontFileName}`,
    interFontUrl: `react/${interFontFileName}`,
    environment: process.env.SERVER_ENV,
  })
}

bundler.on('bundled', (bundle) => {
  const indexHtml = fs.readFileSync(bundle.name, 'utf-8')

  const HTML = generateHTML(
    getHashedFileName(indexHtml, 'favicon', 'ico'),
    getHashedFileName(indexHtml, 'src', 'js'),
    getHashedFileName(indexHtml, 'SpaceGrotesk-VariableFont_wght', 'ttf'),
    getHashedFileName(indexHtml, 'Inter-VariableFont_slnt,wght', 'ttf')
  )

  fs.writeFile(`${templateFolder}/portal.html`, HTML, (error) => {
    if (error) {
      return console.log(error)
    }
    console.log('portal.html django template generated successfully')
  })
})

bundler.bundle()
