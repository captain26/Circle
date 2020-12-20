import React from "react"


export const Card = (prop) => {
        return (
     <div className={prop.class} style={prop.borderRadius== null ? {borderRadius:"15px"} : {borderRadius:prop.borderRadius}}>
            {prop.children}
      </div>
        );
}