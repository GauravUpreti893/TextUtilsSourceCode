import React from 'react'
export default function Footer(props) {
    return (
        <footer className="text-center text-lg-start mt-auto" style={props.mode === 'Dark Mode'?{
            backgroundColor:'#F8F9FA'
        }:{
            backgroundColor:'#1F1F1F'
        }}>
            <div className={`text-center text-${props.mode === 'Dark Mode'?"secondary":"light"} p-3`}>
                © 2022 Copyright:
                <span className={`text-center text-${props.mode === 'Dark Mode'?"secondary":"white"} p-1`}>TextUtils.com</span>
            </div>
        </footer>
  )
}
