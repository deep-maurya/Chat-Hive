import React, { useEffect, useState } from 'react';
import { Layout } from '../../Components/Panel/Layout';
import { Loading } from '../../Components/Utils/Loading';

export const Dashboard = () => {
  const [loading,setLoading] = useState(false)
  
  useEffect(() => {
    
  }, []);
  if(loading){
    return <Loading/>
  }
  return (
    <Layout>
      
      
    </Layout>
  );
};
