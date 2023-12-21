import {Command, RaycastLightIcon} from 'launcher-api'
import React from 'react'
import {
    SearchRepositoriesResponse,
    getRepo
} from './useRepo';
import {useRequest} from 'ahooks';
import {formatDate} from "./date";
import {useKeyPress} from "ahooks";

const numberFormatter = new Intl.NumberFormat("en-US", {notation: "compact", compactDisplay: "short"});
const App = () => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const listRef = React.useRef<HTMLInputElement>(null)
    const {data, loading, run} = useRequest(getRepo, {
        debounceWait: 500,
        manual: true,
    });
    React.useEffect(() => {
        inputRef.current?.focus()
    })

    useKeyPress('Esc', () => {
        // exit current ext
        window.launcher.loadMainView()
    })

    const onValueChange = (v: string) => {
        run(v)
    }

    return (
        <Command className='raycast' shouldFilter={false}>
            <div cmdk-raycast-top-shine=""/>
            <Command.Input loading={loading} onValueChange={onValueChange} autoFocus ref={inputRef}/>

            <Command.List ref={listRef}>
                {/* @ts-ignore */}
                <RepoList data={data}/>
            </Command.List>

            <div cmdk-raycast-footer="">
                <RaycastLightIcon/>

                <button cmdk-raycast-open-trigger="">
                    Open Application
                    <kbd>↵</kbd>
                </button>
                <hr/>

            </div>
        </Command>
    )
}

const RepoList = ({data}: {
    data?: SearchRepositoriesResponse
}) => {
    if (data === undefined) {
        return (
            <Command.Empty>No results found.</Command.Empty>
        )
    }

    return (
        <div>
            <Command.Group>
                {data?.items.map((item) => (
                    <Command.Item
                        key={item.full_name}
                        value={item.full_name}
                        onSelect={() => {
                            window.launcher.openUrl(item.html_url)
                        }}
                    >
                        <img src={item.owner.avatar_url} className="w-5 h-5 mr-2"/>
                        <span>{item.full_name}</span>
                        <span className="text-bgray10">
                            ✩ {numberFormatter.format(item.stargazers_count)}
                        </span>
                        <span className="absolute right-5 text-bgray10">
                            {item.language}
                            •
                            {formatDate(item.updated_at)}
                        </span>
                    </Command.Item>
                ))}
            </Command.Group>
        </div>
    )
}

export default App
