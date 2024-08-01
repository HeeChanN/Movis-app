import { queryOptions, useMutation, useQuery, UseQueryOptions} from "@tanstack/react-query";
import { getAccessToken, getMain, postLogin, postSingup } from "../api/auth";
import { UseMutationCustomOptions, UseQueryCustomOptions } from "../types/common";
import { removeEncryptStorage, setEncryptStorage } from "../utils/encryptStorage";
import { removeHeader, setHeader } from "../utils/header";
import { useEffect } from "react";
import queryClient from '../api/queryClient';



function useSignup(mutationOptions?: UseMutationCustomOptions) {
    return useMutation({
        mutationFn: postSingup,
        ...mutationOptions
    });
}

function useLogin(mutationOptions?: UseMutationCustomOptions){
    return useMutation({
        mutationFn: postLogin,
        onSuccess:({accessToken, refreshToken})=>{
            console.log('success');
            setEncryptStorage('refreshToken', refreshToken);
            setHeader('Authorization', `Bearer ${accessToken}`)
        },
        onError:(error)=>{
            console.log("Login Failed", error.response?.data);
        },
        onSettled: ()=>{
            queryClient.refetchQueries({queryKey:['auth','getAccessToken']})
        },
        ...mutationOptions,
    })
}


function useGetRefreshToken(){
    const {data, isSuccess, isError} = useQuery({
        queryKey: ['auth','getAccessToken'],
        queryFn: getAccessToken,
        staleTime: 1000*60*28,
        refetchInterval: 1000*60*28,
        refetchOnReconnect: true,
        refetchIntervalInBackground: true, // 앱이 백그라운드일 때도 다시 가져옴
    })

    useEffect(()=>{
        if(isSuccess){
            setHeader('Authorization', `Bearer ${data.accessToken}`),
            setEncryptStorage('refresthToken', data.refreshToken)
        }
    }, [isSuccess]);
    useEffect(()=>{
        if(isError){
            removeHeader('Authorization'),
            removeEncryptStorage('refreshToken')
        }
    }, [isError]);
    return{isSuccess, isError};
}

function useGetMain(queryOptions: UseQueryCustomOptions){
    return useQuery({
        queryKey: ['auth', 'getMain'],
        queryFn: getMain,
        ...queryOptions,
    })
}

function useAuth(){
    const signupMutation = useSignup();
    const refreshTokenQuery = useGetRefreshToken();
    const getMainQuery = useGetMain({
        enabled: refreshTokenQuery.isSuccess
    })
    const isLogin = getMainQuery.isSuccess;
    const loginMutation = useLogin();

    return {signupMutation, loginMutation, isLogin,getMainQuery};
}

export default useAuth;