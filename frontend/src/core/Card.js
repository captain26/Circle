import React from "react"


export const Card = (prop) => {
        return (
     <div className={prop.class} style={{borderRadius:"15px"}}>
            {prop.children}
      </div>
        );
}