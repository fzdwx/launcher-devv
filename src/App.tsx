import React, {useEffect, useState} from 'react'
import {useKeyPress} from "ahooks";
import {getActionCommand} from "launcher-api/dist/api";

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
        const action = getActionCommand()
        if (action != 'devv-clipboard') {
            return
        }

        iframeRef.current?.addEventListener('did-finish-load', () => {
            if (text != "" || text.trim() !== "" || text.trim().length > 0) {
                // @ts-ignore
                iframeRef.current.paste()
                // @ts-ignore
                // send enter 打印 hello world
                iframeRef.current.sendInputEvent({type: 'keyDown', keyCode: 'Enter'})
            }
        })
    }, [iframeRef, text]);

    useEffect(() => {
        iframeRef.current.addEventListener('dom-ready', () => {
            const div = document.createElement('div');
            div.innerText = 'Exit'
            div.style.position = 'fixed'
            div.style.bottom = '30px'
            div.style.right = '50px'
            div.style.color = 'red'
            div.style.cursor = 'pointer'
            div.onclick = () => {
                window.launcher.loadMainView()
            }
            iframeRef.current.shadowRoot.appendChild(div)

        });

//         iframeRef.current.addEventListener('did-finish-load', () => {
//             iframeRef.current.openDevTools()
//             iframeRef.current.executeJavaScript(`
//             window.document.getElementsByTagName('textarea')[0].addEventListener('keydown', (e) => {
//                 window.parent.postMessage("hello world")
//                 console.log("post message",window.parent)
//             })
// `)
//         })

    }, [iframeRef]);

    window.onmessage = (e) => {
        console.log(e)
    }


    return (
        <div>
            <webview ref={iframeRef} src='https://devv.ai' className='w-full h-100vh'>

            </webview>
        </div>
    )
}

export default App
