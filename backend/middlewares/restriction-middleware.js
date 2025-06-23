const allowedIPs = [
  '192.168.1.41'
];

function restrictionMiddleware(req, res, next) {
  
  const requestIP =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);

  
  console.log('Request IP:', requestIP);

  
  if (allowedIPs.includes(requestIP)) {
    return next();
  } else {
    return res.status(403).json({ message: 'Access denied: Your IP is not allowed.' });
  }
}

module.exports = restrictionMiddleware;