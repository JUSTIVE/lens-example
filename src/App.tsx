import { useState } from 'react'
import * as O from "optics-ts/standalone"
import { A, flow} from '@mobily/ts-belt'


type FrameWork = {
  name:string,
  meta:{
    year:number,
    data:{
      developer:string,
      versions:{
        latest:readonly number[]
      }
    }
  }
}

const versionOpt = O.compose(
      'meta',
      'data',
      'versions',
      'latest'
    )

function App() {
  const [info, setInfo] = useState<FrameWork>({
    name:'React',
    meta:{
      year:2013,
      data:{
        developer:"Meta",
        versions:{
          latest:[16.0,17.1,18.1]
        }
      }
    }
  })

  const addVersion = (newVersion:number) => {
    setInfo((prevInfo)=>({
      ...prevInfo,
      meta:{
        ...prevInfo.meta,
        data:{
          ...prevInfo.meta.data,
          versions:{
            latest:[...prevInfo.meta.data.versions.latest,newVersion]
          }
        }
      }
    }))
  }

  const addVersionLens =
    flow(
      A.append<number>,
      O.modify(versionOpt),
      setInfo
    )
  

  return (
    <>
      <button onClick={()=>addVersion(18.2)}>
        {JSON.stringify(info)}
      </button>
      <button onClick={()=>addVersionLens(18.2)}>
        {JSON.stringify(info)}
      </button>
    </>
  )
}

export default App
