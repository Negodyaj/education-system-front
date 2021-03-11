import React from "react";
import "./NewsList.css";
import './components/news-alert/NewsAlert'
import NewsAlert from "./components/news-alert/NewsAlert";

const news = [
    'Преподаватель принял вашу домашнюю работу "Циклы".',
    'Защита курса переносится на 24 сентября в 12.00!',
    'У вас осталось 2 дня на выполнение домашней работы "Двумерные массивы"!',
    'Необходимо произвести оплату курса 15 сентября!'
]

function NewsList() {
    return (
        <div className="alerts-window">
            {
                news.map(text => <NewsAlert text={text}/>)
            }
        </div>
    )
}

export default NewsList;