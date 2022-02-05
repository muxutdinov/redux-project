import React from 'react';
import { useEffect } from 'react';
import useHttp from '../hook/useHttp';
import { useSelector,useDispatch } from 'react-redux';
import {newsFetching,newsFetched,newsFetchingError} from '../redux/actions'
import Spinner from './Spinner';
import Error from './Error';
import NewsListItem from './NewsListItem';


const NewsList = (props) => {

  const {news,newsLoadingStatus} = useSelector(state=>state)
  const dispatch = useDispatch()
  const {request} = useHttp()
  console.log(newsLoadingStatus);

  useEffect(()=>{
    dispatch(newsFetching())
    request("http://localhost:3001/news")
    .then(data=>dispatch(newsFetched(data)))
    .catch(()=>dispatch(newsFetchingError()))
  },[])
  if(newsLoadingStatus==="loading"){
    return <Spinner/>
  }else if(newsLoadingStatus==="error"){
    return <Error/>
  }
  const renderNewsList =(arr)=>{
    if(arr.length===0){
      return <h3 className='text-center mt-5'>News doesn't not exists</h3>
    }
    return arr.map(({id,...props})=>{
      return <NewsListItem key={id} {...props}/>
    })
  }
  
  const element = renderNewsList(news)
  
  return (
    <ul>{element}</ul>
  )
};

export default NewsList;
