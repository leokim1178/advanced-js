// 클로저 활용

function discount(){

    const dcRate=0.1; // private 변수
    // dcRate가 const이긴 하지만 외부의 오염을 방지하기 위해서 보호하기 위한 목적이다
    return function  (price){  // 내부함수 : 외부에서 dcRate 참조 가능하도록하는 함수를 반환
        return price *dcRate; // dcRate를 외부에서 직접 접근 못하지만 이 함수는 참조 가능
    }
}
// 즉 외부에서 현재 할인율을 알 수는 없다

const items = [
    {name : 'shoe', price:54000}, 
    {name : 'bag', price:32000},
]

const dc = discount(); // discount 함수 실행 -> 내부함수 반환

for(const {name,price:orgPrice} of items){
    const salePrice = orgPrice - dc(orgPrice); // 내부함수 호출
    console.log(`${name} : ${orgPrice}원 -> ${salePrice}원`);
}