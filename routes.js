const fs=require('fs')
const requestHandler=(req, res) => {
  if( req.url === '/' ) {
    res.write('<html>')
    res.write('<head><title>Hello World</title></head>')
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
    res.write('</html>')
    return res.end()
  }
  if( req.url === '/message' && req.method === 'POST' ) {
    const body=[]
    req.on('data', (chunk) => {
      console.log(chunk)
      body.push(chunk)
    })
    return req.on('end', () => {
      const parsedBody=Buffer.concat(body).toString()
      const message=parsedBody.split('=')[1]
      console.log(message)
      fs.writeFileSync('message.txt', message)
      res.statusCode=302
      res.setHeader('Location', '/')
      return res.end()
    })
  }
  res.setHeader('Content-Type', 'text/html')
  res.write('<html>')
  res.write('<head><title>Hello World</title></head>')
  res.write('<body><h1>Hello World</h1></body>')
  res.write('</html>')
  res.end()
}
module.exports=requestHandler