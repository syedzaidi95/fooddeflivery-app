import React from 'react'
import { RingLoader } from 'react-spinners'

// const override = {
//     display: 'flex',
//     // position: 'fixed',
//     // margin: ,
//     borderColor: 'red',
// }

function RegLoader() {
    return (
        <div style={{height: '100vh'}}>
        <div style={{margin: '0px auto', width: '350px'}}>
        <RingLoader
            // css={{display: 'flex'}}
            sizeUnit={"2px"}
            size={30}
            color={'#123abc'}
            loading={true}
            />
            </div>
            </div>
    )
}

export {
    RegLoader,

}