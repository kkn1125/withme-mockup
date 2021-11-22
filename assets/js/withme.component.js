Array.prototype.insertInto = function (insertInto = 0, ...args) {
    this.splice(insertInto, 0, ...args);
    return this;
}

let choose = '';

const theme = {
    card: {
        render: (
            link = '#',
            info = 'No info',
            title = 'No Title',
            content = 'No Contents',
            start = '-',
            end = '-',
            addr = '-',
            call = '000-0000-0000'
        ) => {
            return `
                <div class="card">
                    <div class="card-title"><span>${title}</span> <span class="tag text-muted">${info}</span> </div>
                    <a class="card-content">
                        <div class="card-body">
                            <p class="tag"></p>
                            <p>${content}</p>
                            <p class="my-1">${addr}</p>
                            <p>
                                <span class="tag tag-info">${call}</span>
                            </p>
                        </div>
                        <a href="${link}" class="card-link">Link</a>
                        <div class="card-time">
                            <span>${start}</span>
                            <span class="vr"></span>
                            <span>${end}</span>
                        </div>
                    </div>
                </div>
            `;
        }
    },
    simple: {
        render: (
            link = '#',
            title = 'No Title',
            addr = 'No Address',
        )=>{
            return `
                <div class="card w-flex justify-content-center align-items-center flex-grow-0 position-relative" style="height: 22rem;background-color: rgb(${parseInt(Math.random()*256)},${parseInt(Math.random()*256)},${parseInt(Math.random()*256)});">
                    <div class="shape-${parseInt(Math.random()*5)+1} position-absolute top-50 start-50 position-middle" style="height: 14rem; width: 14rem;"></div>
                    <div class="w-flex flex-column justify-content-center align-items-center" style="width:15rem; z-index: 10;">
                        <div class="card-title text-truc">${title}</div>
                            <a class="card-content">
                            <div class="card-body">
                                <p class="my-1">${addr}</p>
                            </div>
                            <a hidden href="${link}" class="card-link">Link</a>
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

const pages = {
    test1: {
        title: 'Sample Title',
        content: 'Sample contents Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, perferendis.',
        start: '2021-11-22',
        end: '2021-11-22',
        addr: '경상남도 창원시 진해구 여좌남로 23',
        call: '055-541-1234',
        info: 'Sample Festivals',
        link: 'https://www.naver.com',
    },
    test2: {
        title: 'Sample Title',
        content: 'Sample contents Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, perferendis.',
        start: '2021-11-22',
        end: '2021-11-22',
        addr: '경상남도 창원시 진해구 여좌남로 23',
        call: '055-541-1234',
        info: 'Sample Festivals',
        link: 'https://www.naver.com',
    },
}

const withmeCard = {
    type: (type)=> theme[type],
}