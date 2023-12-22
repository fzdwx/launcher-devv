import React, {useEffect, useState} from 'react'
import {useRequest} from 'ahooks';
import {useKeyPress} from "ahooks";
import {sleep} from "ahooks/es/utils/testingHelpers";

const numberFormatter = new Intl.NumberFormat("en-US", {notation: "compact", compactDisplay: "short"});
const App = () => {
    const iframeRef = React.useRef<HTMLWebViewElement>(null)
    const [text, setText] = useState('')
    React.useEffect(() => {
        iframeRef.current?.focus()
    })

    useKeyPress('Esc', () => {
        // exit current ext
        window.launcher.loadMainView()
    })

    useEffect(() => {
        async function init() {
            const clipText = await window.launcher.getSelect()
            if (clipText) {
                window.launcher.setClipText(clipText)
                setText(clipText)
            }
        }

        init()
    }, [])

    useEffect(() => {
        iframeRef.current?.addEventListener('did-finish-load', () => {
            if (text != "" || text.trim() !== "" || text.trim().length > 0) {
                // @ts-ignore
                // iframeRef.current.selectAll()
                // @ts-ignore
                iframeRef.current.paste()
                // @ts-ignore
                // send enter 打印 hello world
                iframeRef.current.sendInputEvent({type: 'keyDown', keyCode: 'Enter'})
            }
        })
    }, [iframeRef, text]);


    return (
        <div>
            <webview ref={iframeRef} disablewebsecurity src='https://devv.ai/zh' className='w-full h-540px'>

            </webview>
        </div>
    )
}

export default App
