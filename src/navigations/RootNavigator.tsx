import AuthStackNavigator from './AuthStackNavigator';
import MainStackNavigator from './MainStackNavigator';
import useAuth from '../hooks/useAuth';



function RootNavigator() {
  const {isLogin} = useAuth();

  console.log('isLogin:', isLogin);

  return <>{isLogin ?  <MainStackNavigator/> : <AuthStackNavigator/> }</>
}


export default RootNavigator;