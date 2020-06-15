import history from './history';
import config from './config/config';

let eventRegister = function(router) {
  const routerPush = router.push.bind(router);
  const routerGo = router.go.bind(router);
  const routerReplace = router.replace.bind(router);
  const routerBack = router.back.bind(router);
  const routerForward = router.forward.bind(router);

  router.push = (location, direction, onResolve, onReject) => {
    history.action = config.pushName;
    history.direction = direction || config.forwardName;
    return routerPush(location, onResolve, onReject);
  };

  router.go = ({ index, direction }) => {
    history.action = config.goName;
    history.direction = direction || (index < 0 ? config.backName : config.forwardName);
    routerGo(index);
  };

  router.replace = (location, direction, onResolve, onReject) => {
    history.action = config.replaceName;
    history.direction = direction || config.forwardName;
    return routerReplace(location, onResolve, onReject);
  };

  router.back = direction => {
    history.action = config.backName;
    history.direction = direction || config.backName;
    routerBack();
  };

  router.forward = direction => {
    history.action = config.forwardName;
    history.direction = direction || config.forwardName;
    routerForward();
  };
};

export default eventRegister;
