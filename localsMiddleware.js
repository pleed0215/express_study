import routes from "./routes"

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = 'WeTube'; // this is how to use global variables in html(or pug). I can use this by javascript ie. #{ siteName }
    res.locals.routes = routes;
    next ();
};