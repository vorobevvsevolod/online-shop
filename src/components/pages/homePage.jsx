import Card from "../Card";
import CardLoad from "../Card/CardLoad";
import React from "react";
import {CardArrayContext, ServerErrorContext} from "../../App";

function HomePage (){
    const [searchValue,  setSearchValue] = React.useState('');
    const {cardArray} = React.useContext(CardArrayContext);
    const {serverError} = React.useContext(ServerErrorContext)
    return(
        <div className='content p-40'>
            <div className='d-flex align-center mb-40 justify-between'>
                <h1>{(serverError) ?`Ошибка сервера...` : (!cardArray.length) ? `Загрузка...` : (searchValue) ? `Поиск...` : "Все кроссовки"}</h1>
                {
                    (cardArray.length)
                        ?
                        <div className="search-block d-flex align-center">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.25 15.25L11.8855 11.8795L15.25 15.25ZM13.75 7.375C13.75 9.06576 13.0784 10.6873 11.8828 11.8828C10.6873 13.0784 9.06576 13.75 7.375 13.75C5.68424 13.75 4.06274 13.0784 2.86719 11.8828C1.67165 10.6873 1 9.06576 1 7.375C1 5.68424 1.67165 4.06274 2.86719 2.86719C4.06274 1.67165 5.68424 1 7.375 1C9.06576 1 10.6873 1.67165 11.8828 2.86719C13.0784 4.06274 13.75 5.68424 13.75 7.375V7.375Z" stroke="#E4E4E4" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                            <input value={searchValue} onChange={(event) => setSearchValue(event.target.value)} type="text" placeholder='Поиск...'/>
                            {(searchValue) && <img className='clearSearch' src="/img/close-x.svg" alt="close" onClick={() => setSearchValue('')}/>}
                        </div>
                        : ''
                }
            </div>
            <div className='CardCollection'>
                {
                    (cardArray.length) ?
                        cardArray.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
                            .map(item => (
                                <Card key={item.id} {...item}/>
                            ))
                        : Array.from({length: 16}, (v, i) => <CardLoad key={i}/>)
                }
            </div>
        </div>
    )
}

export default HomePage;