Array.prototype.insertInto = function (insertInto = 0, ...args) {
    this.splice(insertInto, 0, ...args);
    return this;
}

let choose = '';

const theme = {
    card: {
        render: (
            {홈페이지주소 = '#',
            관련정보 = 'No info',
            축제이름 = 'No Title',
            내용 = 'No Contents',
            시작일 = '-',
            종료일 = '-',
            도로명주소 = '-',
            전화번호 = '000-0000-0000'}
        ) => {
            return `
                <div class="card">
                    <div class="card-title"><span>${축제이름}</span> <span class="tag text-muted">${관련정보}</span> </div>
                    <a class="card-content">
                        <div class="card-body">
                            <p class="tag"></p>
                            <p>${내용}</p>
                            <p class="my-1">${도로명주소}</p>
                            <p>
                                <span class="tag tag-info">${전화번호}</span>
                            </p>
                        </div>
                        <a href="${홈페이지주소}" class="card-link">Link</a>
                        <div class="card-time">
                            <span>${시작일}</span>
                            <span class="vr"></span>
                            <span>${종료일}</span>
                        </div>
                    </div>
                </div>
            `;
        }
    },
    simple: {
        render: (
            {홈페이지주소 = '#',
            축제이름 = 'No Title',
            도로명주소 = 'No Address',}
        )=>{
            return `
                <div class="card w-flex justify-content-center align-items-center flex-grow-0 position-relative" style="height: 22rem;background-color: rgb(${parseInt(Math.random()*256)},${parseInt(Math.random()*256)},${parseInt(Math.random()*256)});">
                    <div class="shape-${parseInt(Math.random()*5)+1} position-absolute top-50 start-50 position-middle" style="height: 14rem; width: 14rem;"></div>
                    <div class="w-flex flex-column justify-content-center align-items-center" style="width:15rem; z-index: 10;">
                        <div class="card-title text-truc">${축제이름}</div>
                            <a class="card-content">
                            <div class="card-body">
                                <p class="my-1">${도로명주소}</p>
                            </div>
                            <a hidden href="${홈페이지주소}" class="card-link">Link</a>
                        </div>
                    </div>
                </div>
            `;
        }
    }

}

const title = {
    render: page => `With Me${page.split('').insertInto(0, ' - ').join('')}`
};

const pages = {};

const withmeCard = {
    type: (type)=> theme[type],
}

const result = document.getElementById('result');
const select = document.getElementById('select');
const inputText = document.getElementById('inputText');
const date = document.getElementById('date');
const moreBtn = document.getElementById('moreBtn');
const next = document.getElementById('next');

let iss = false;
let page = 0;
let limit = 100;
// let festInfo = null;

let thisUrl = (total)=>{
    let totals = 100;
    if(total) totals = parseInt(total);
    return `http://api.data.go.kr/openapi/tn_pubr_public_cltur_fstvl_api?serviceKey=Gt5Gap%2FfosnAgnq2TqWCo8Jz1N8Gz%2ByDLIKAYJ1Yi%2ByBzDaA88sc6y7NLfblGtfhLkN4htmTfErFloQxDoFsxQ%3D%3D&pageNo=0&numOfRows=${totals}&type=xml`;
}

window.addEventListener('load', () => {
    fetchData(thisUrl());
});

function fetchData(url) {
    //fetch를 활용한 allOrigins방식 사용
    fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`)
    .then(response => {
        if (response.ok) return response.text(); //.json(), .blob()사용가능
        throw new Error('Network response was not ok.')
    }).then((data) => {
        let total = new DOMParser().parseFromString(data, 'application/xml').querySelector('totalCount');
        getDatas(total);
        resultData(data);
    });

    async function getDatas (total){
        if(!iss){
            iss=true;
            fetchData(thisUrl(await total.textContent));
        }
    }

    async function resultData(data){
        let allData = new DOMParser().parseFromString(data, 'application/xml');
        window.festInfo = new TotalData(allData);
        festInfo.total = parseInt(allData.querySelector('totalCount').textContent);
    }
}

let count = 0;
requestAnimationFrame(requestData);
function requestData(){
    if(window['festInfo']) {
        festInfo.festivals.forEach(item=>{
            pages[`'${count}'`] = {};
            Object.keys(item).forEach(name=>{
                pages[`'${count}'`][name] = item[name];
            })
            count++;
        });
        Withme.init();
    } else requestAnimationFrame(requestData);
}

function TotalData(all) { // 모든 축제 데이터
    this.festivals = [];
    all.querySelectorAll('item').forEach(item=>{
        this.festivals.push(new festival(item));
    });
}

function festival(item){
    function validate(type){
        let target = item.querySelector(type);
        let content = target?target.textContent:'';
        if(target) return content=='없음'?'':content;
        else return '';
    }
    this.축제이름 = validate('fstvlNm');
    this.축제장소 = validate('opar');
    this.시작일 = validate('fstvlStartDate');
    this.종료일 = validate('fstvlEndDate');
    this.내용 = validate('fstvlCo');
    this.주관기관 = validate('mnnst');
    this.주최기관 = validate('auspcInstt');
    this.후원기관 = validate('suptlnstt');
    this.전화번호 = validate('phoneNumber');
    this.홈페이지주소 = validate('homepageUrl');
    this.관련정보 = validate('relateInfo');
    this.도로명주소 = validate('rdnmadr');
    this.지번주소 = validate('ldmadr');
    this.위도 = validate('latitude');
    this.경도 = validate('longitude');
    this.데이터기준일자 = validate('referenceDate');
    this.제공기관코드 = validate('instt_code');
    this.제공기관명 = validate('instt_nm');
}

function TotalFestivalNum({response}) { // 등록된 축제 데이터의 수
    this.totalFesNum = response.body.totalCount;
}

// function render(fest){
//     result.innerHTML += `<li>
//         <p>축제 이름: ${fest.축제이름}</p>
//         <p>장소: ${fest.축제장소}</p>
//         <p>행사 일시: ${fest.시작일}~${fest.종료일}</p>
//         <p>${fest.내용}</p>
//         <p>전화 번호: ${fest.전화번호}</p>
//         <p><a href="${fest.홈페이지주소}">${fest.홈페이지주소}</a></p>
//         <p>관련 정보: ${fest.관련정보}</p>
//         <p>주소: ${fest.도로명주소}</p>
//         <p>위도: ${fest.위도}</p>
//         <p>경도: ${fest.경도}</p>
//     </li>`;
// }

inputText.addEventListener('keyup', searchHandlar);

function searchHandlar(ev){
    let value = ev.target.value; // 입력한 검색어
    let keyCode = ev.key; // 키 코드 code -> key

    if(keyCode == 'Enter') { // 검색어 입력 후 enter
        result.innerHTML = '';
        let idx = 0;

        festInfo.festivals.forEach((fest)=>{
            // 축제이름, 축제장소, 도로명주소에서 입력값 검색
            if(fest.축제이름.indexOf(value) != -1 || 
                fest.축제장소.indexOf(value) != -1 ||
                fest.도로명주소.indexOf(value) != -1 ||
                fest.내용.indexOf(value) != -1 ||
                fest.관련정보.indexOf(value) != -1) 
            {
                idx++; // 검색어와 일치하는 축제 수
                result.innerHTML += withmeCard.type('simple').render(fest);
            }
        });
        if(idx == 0) {
            result.innerHTML = 
            `<p>일치하는 결과가 없습니다.</p>`;
        }
    }
}

let year = document.getElementById('year');
let month = document.getElementById('month');
let day = document.getElementById('day');

// 처음에 같은 배열로 시작해서 같은 변수를 받아 단계적으로 거르기
year.addEventListener('change', yearHandlar);
month.addEventListener('change', yearHandlar);
day.addEventListener('change', yearHandlar);

function yearHandlar(ev){
    let yvalue = year.value
    let mvalue = month.value
    let dvalue = day.value
    result.innerHTML = '';

    let festStartYear = (year)=>parseInt(year.시작일.split('-').shift());
    let festEndYear = (year)=>parseInt(year.종료일.split('-').shift());
    let festStartMonth = (month)=>parseInt(month.시작일.split('-')[1]);
    let festEndMonth = (month)=>parseInt(month.종료일.split('-')[1]);
    let festStartDay = (day)=>parseInt(day.시작일.split('-').pop());
    let festEndDay = (day)=>parseInt(day.종료일.split('-').pop());

    let resultArray = 
    festInfo.festivals
    .filter(year=>festStartYear(year)<=parseInt(yvalue)&&festEndYear(year)>=parseInt(yvalue))
    .filter(month=>festStartMonth(month)<=parseInt(mvalue)&&festEndMonth(month)>=parseInt(mvalue))
    .filter(day=>festStartDay(day)<=parseInt(dvalue)&&festEndDay(day)>=parseInt(dvalue));

    resultArray.length==0?result.innerHTML = 
    `<p>일치하는 결과가 없습니다.</p>`:resultArray.forEach(fest=> result.innerHTML += withmeCard.type('simple').render(fest));
}