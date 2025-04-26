// middleware/userRole.js
module.exports = function(role) {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ msg: 'Authorization denied' });
      }
  
      if (req.user.role !== role && req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Permission denied' });
      }
      
      next();
    };
  };