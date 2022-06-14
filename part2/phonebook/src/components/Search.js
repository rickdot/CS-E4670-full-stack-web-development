const Search = (props) => 
  <form>
      filter shown with <input value={props.search} onChange={props.onChange}/>
  </form>


export default Search