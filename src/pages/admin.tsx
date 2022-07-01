import React from 'react'

const admin = () => {
  return (
    <div>
      
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      protected: true,
      roles: ['admin']
    }
  };
}

export default admin
