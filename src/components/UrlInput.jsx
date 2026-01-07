function UrlInput({url, setUrl,onSummarise}){
    return(
        <div className="input-group">
            <input
            type="text" placeholder="Enter website URL" value={url}
            onChange={(e)=>setUrl(e.target.value)}
            />
            <button onClick={onSummarise}>Summarise</button>
            
            
        </div>
    );
}
export default UrlInput;