//수정
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc, query, orderBy, limit, getDocs, serverTimestamp } from 'firebase/firestore';
import {
    Heart,
    Zap,
    BookOpen,
    Pencil,
    BookMarked,
    Play,
    ArrowLeft,
    Save,
    Download,
    FastForward,
    PlayCircle,
    ScrollText,
    Maximize,
    Home,
    ChevronRight,
    Star,
    Sparkles,
    Crown,
    Users,
    X,
    RefreshCw,
    ThumbsUp,
    Trophy,
    Mic,
    Volume2,
    ShoppingBag,
    Gem,
    Clock,
    Shirt,
    Gift,
    CreditCard,
    Check
} from 'lucide-react';

// Import assets
import bgFirstPage from './background_firstpage.png';
import bgSchool from './background_school.png';
import bgVillage from './background_village.png';
import bgCafe from './background_cafe.png';
import bgTraining from './background_trainingcenter.png';
import bgEnding1 from './background_ending1.png';
import bgEnding2 from './background_ending2.png';
import bgEnding3 from './background_ending3.png';
import bgBadEnding1 from './background_badending1.png';
import bgBadEnding2 from './background_badending2.png';
import bgBadEnding3 from './background_badending3.png';
import bgPrologue from './background_school.png'; // Prologue background
import boyImg from './boy.png';
import boyTrainingImg from './boy_training.png';
import girl1Img from './girl1.png';
import girl2Img from './girl2.png';
import girl3Img from './girl3.png';

// Hiragana data (full chart)
const hiraganaData = [
    // あ行
    { char: 'あ', romaji: 'a' }, { char: 'い', romaji: 'i' }, { char: 'う', romaji: 'u' }, { char: 'え', romaji: 'e' }, { char: 'お', romaji: 'o' },
    // か行
    { char: 'か', romaji: 'ka' }, { char: 'き', romaji: 'ki' }, { char: 'く', romaji: 'ku' }, { char: 'け', romaji: 'ke' }, { char: 'こ', romaji: 'ko' },
    // さ行
    { char: 'さ', romaji: 'sa' }, { char: 'し', romaji: 'shi' }, { char: 'す', romaji: 'su' }, { char: 'せ', romaji: 'se' }, { char: 'そ', romaji: 'so' },
    // た行
    { char: 'た', romaji: 'ta' }, { char: 'ち', romaji: 'chi' }, { char: 'つ', romaji: 'tsu' }, { char: 'て', romaji: 'te' }, { char: 'と', romaji: 'to' },
    // な行
    { char: 'な', romaji: 'na' }, { char: 'に', romaji: 'ni' }, { char: 'ぬ', romaji: 'nu' }, { char: 'ね', romaji: 'ne' }, { char: 'の', romaji: 'no' },
    // は行
    { char: 'は', romaji: 'ha' }, { char: 'ひ', romaji: 'hi' }, { char: 'ふ', romaji: 'fu' }, { char: 'へ', romaji: 'he' }, { char: 'ほ', romaji: 'ho' },
    // ま行
    { char: 'ま', romaji: 'ma' }, { char: 'み', romaji: 'mi' }, { char: 'む', romaji: 'mu' }, { char: 'め', romaji: 'me' }, { char: 'も', romaji: 'mo' },
    // や行
    { char: 'や', romaji: 'ya' }, { char: 'ゆ', romaji: 'yu' }, { char: 'よ', romaji: 'yo' },
    // ら行
    { char: 'ら', romaji: 'ra' }, { char: 'り', romaji: 'ri' }, { char: 'る', romaji: 'ru' }, { char: 'れ', romaji: 're' }, { char: 'ろ', romaji: 'ro' },
    // わ行
    { char: 'わ', romaji: 'wa' }, { char: 'を', romaji: 'wo' }, { char: 'ん', romaji: 'n' },
];

// Katakana data (full chart)
const katakanaData = [
    // ア行
    { char: 'ア', romaji: 'a' }, { char: 'イ', romaji: 'i' }, { char: 'ウ', romaji: 'u' }, { char: 'エ', romaji: 'e' }, { char: 'オ', romaji: 'o' },
    // カ行
    { char: 'カ', romaji: 'ka' }, { char: 'キ', romaji: 'ki' }, { char: 'ク', romaji: 'ku' }, { char: 'ケ', romaji: 'ke' }, { char: 'コ', romaji: 'ko' },
    // サ行
    { char: 'サ', romaji: 'sa' }, { char: 'シ', romaji: 'shi' }, { char: 'ス', romaji: 'su' }, { char: 'セ', romaji: 'se' }, { char: 'ソ', romaji: 'so' },
    // タ行
    { char: 'タ', romaji: 'ta' }, { char: 'チ', romaji: 'chi' }, { char: 'ツ', romaji: 'tsu' }, { char: 'テ', romaji: 'te' }, { char: 'ト', romaji: 'to' },
    // ナ行
    { char: 'ナ', romaji: 'na' }, { char: 'ニ', romaji: 'ni' }, { char: 'ヌ', romaji: 'nu' }, { char: 'ネ', romaji: 'ne' }, { char: 'ノ', romaji: 'no' },
    // ハ行
    { char: 'ハ', romaji: 'ha' }, { char: 'ヒ', romaji: 'hi' }, { char: 'フ', romaji: 'fu' }, { char: 'ヘ', romaji: 'he' }, { char: 'ホ', romaji: 'ho' },
    // マ行
    { char: 'マ', romaji: 'ma' }, { char: 'ミ', romaji: 'mi' }, { char: 'ム', romaji: 'mu' }, { char: 'メ', romaji: 'me' }, { char: 'モ', romaji: 'mo' },
    // ヤ行
    { char: 'ヤ', romaji: 'ya' }, { char: 'ユ', romaji: 'yu' }, { char: 'ヨ', romaji: 'yo' },
    // ラ行
    { char: 'ラ', romaji: 'ra' }, { char: 'リ', romaji: 'ri' }, { char: 'ル', romaji: 'ru' }, { char: 'レ', romaji: 're' }, { char: 'ロ', romaji: 'ro' },
    // ワ行
    { char: 'ワ', romaji: 'wa' }, { char: 'ヲ', romaji: 'wo' }, { char: 'ン', romaji: 'n' },
];

// Stage-related vocabulary (from quiz content)
const vocabularyData = [
    // Stage 1 - 하나 (기초 인사/학교)
    { japanese: 'はじめまして', romaji: 'hajimemashite', meaning: '처음 뵙겠습니다', stage: 1 },
    { japanese: 'こんにちは', romaji: 'konnichiwa', meaning: '안녕하세요', stage: 1 },
    { japanese: 'ありがとう', romaji: 'arigatou', meaning: '고마워', stage: 1 },
    { japanese: 'またね', romaji: 'matane', meaning: '또 봐', stage: 1 },
    { japanese: 'はやく', romaji: 'hayaku', meaning: '빨리', stage: 1 },
    { japanese: 'としょかん', romaji: 'toshokan', meaning: '도서관', stage: 1 },
    { japanese: 'やくそく', romaji: 'yakusoku', meaning: '약속', stage: 1 },
    { japanese: 'ドキドキ', romaji: 'dokidoki', meaning: '두근두근', stage: 1 },
    { japanese: 'すき', romaji: 'suki', meaning: '좋아해', stage: 1 },
    // Stage 2 - 미사키 (중급 존댓말/감정)
    { japanese: 'おねがいします', romaji: 'onegaishimasu', meaning: '부탁합니다', stage: 2 },
    { japanese: 'すごいですね', romaji: 'sugoidesune', meaning: '대단해요', stage: 2 },
    { japanese: 'いきたいです', romaji: 'ikitaidesu', meaning: '가고 싶어요', stage: 2 },
    { japanese: 'たのしかった', romaji: 'tanoshikatta', meaning: '즐거웠어(요)', stage: 2 },
    { japanese: 'きれいです', romaji: 'kireidesu', meaning: '예뻐요', stage: 2 },
    { japanese: 'おげんきですか', romaji: 'ogenkidesuka', meaning: '잘 지내세요?', stage: 2 },
    { japanese: 'ケーキ', romaji: 'keeki', meaning: '케이크', stage: 2 },
    { japanese: 'またあいましょう', romaji: 'mataaimashou', meaning: '또 만나요', stage: 2 },
    { japanese: 'すきです', romaji: 'sukidesu', meaning: '좋아해요', stage: 2 },
    // Stage 3 - 히나타 (고급 구어체/카페)
    { japanese: 'ごちゅうもん', romaji: 'gochuumon', meaning: '주문', stage: 3 },
    { japanese: 'マジで', romaji: 'majide', meaning: '진짜로', stage: 3 },
    { japanese: 'それにします', romaji: 'sorenishimasu', meaning: '그걸로 할게요', stage: 3 },
    { japanese: 'たいはない', romaji: 'taihanai', meaning: '다른 뜻 없어', stage: 3 },
    { japanese: 'きになる', romaji: 'kininaru', meaning: '신경 쓰여', stage: 3 },
    { japanese: 'かわいい', romaji: 'kawaii', meaning: '귀여워', stage: 3 },
    { japanese: 'またくるよ', romaji: 'matakuruyo', meaning: '또 올게', stage: 3 },
    { japanese: 'すき', romaji: 'suki', meaning: '좋아해', stage: 3 },
    { japanese: 'コーヒー', romaji: 'koohii', meaning: '커피', stage: 3 },
];

// Character definitions
const characters = {
    girl1: { name: '하나', nameJp: 'はな', image: girl1Img, color: 'pink' },
    girl2: { name: '미사키', nameJp: 'みさき', image: girl2Img, color: 'purple' },
    girl3: { name: '히나타', nameJp: 'ひなた', image: girl3Img, color: 'amber' },
};

// Story data organized by stages
// Story data organized by stages
// 기존 코드의 storyData 부분만 이것으로 교체하세요

// Story data organized by stages
// 기존 코드의 storyData 부분만 이것으로 교체하세요

// Story data organized by stages
// 기존 코드의 storyData 부분만 이것으로 교체하세요

const storyData = {
    // ============================================
    // Prologue: 운명의 교환학생 (運命の留学生)
    // 모태솔로 주인공의 일본 교환학생 첫날
    // ============================================
    stage0: {
        background: bgPrologue,
        girl: null,
        title: '프롤로그 - 운명의 교환학생',
        dialogues: [
            // 도입부: 벚꽃 흩날리는 캠퍼스
            {
                speaker: 'narration',
                text: '벚꽃이 흩날리는 일본의 어느 대학교 교정. 캐리어를 끌고 서 있다.',
                textJp: '桜が舞い散る日本のとある大学のキャンパス。キャリーケースを引いて立っている。'
            },
            {
                speaker: 'narration',
                text: '나는 오늘부터 이곳, 일본에서 교환학생 생활을 시작한다.',
                textJp: '今日からここ、日本での交換留学生活が始まる。'
            },
            {
                speaker: 'narration',
                text: '스물 한 살. 인생 전체가 \"모태솔로\"인 역사였지만... 이번엔 다르다!',
                textJp: '21歳。人生ずっと「彼女いない歴＝年齢」だったけど… 今回は違うぞ！'
            },
            {
                speaker: 'narration',
                text: '만화에서만 보던 로맨틱한 캠퍼스 라이프!',
                textJp: 'アニメで見たようなロマンチックなキャンパスライフ！'
            },
            {
                speaker: 'narration',
                text: '이번 여행의 목표는 단 하나, 바로 \"연애\"다!',
                textJp: '今回の旅の目標はただ一つ、まさに「恋愛」だ！'
            },
            // 낯선 학생이 말을 걸어온다
            {
                speaker: 'narration',
                text: '그때, 누군가 다가와 말을 건다. 하지만 머릿속이 하얘진다.',
                textJp: 'その時、誰かが近づいてきて話しかけてくる。しかし頭の中が真っ白になる。'
            },
            {
                speaker: 'narration',
                text: '???: 「あの、すみません。新入生の方ですか？ここ、どう行けばいいか分かります？」',
            },
            // 퀴즈 1: 첫 일본어 도전
            {
                speaker: 'quiz',
                question: '상대방이 뭔가 물어보고 있다! "실례합니다"라는 뜻의 일본어는?',
                options: [
                    'すみません',
                    'おはよう',
                    'ありがとう',
                    'さようなら'
                ],
                meanings: [
                    '실례합니다',
                    '좋은 아침',
                    '고마워',
                    '잘 가'
                ],
                correct: 0
            },
            {
                speaker: 'narration',
                text: '어... 아노... 에... 나니...? 뭐라고 하는 거야?!',
                textJp: 'えっ… あの… え… 何…？ 何て言ってるの？！',
                condition: 'wrong'
            },
            {
                speaker: 'narration',
                text: '"すみません"...! 그래, 이건 실례합니다라는 뜻!',
                textJp: '「すみません」…！ そう、これは失礼しますという意味！',
                condition: 'correct'
            },
            // 절망의 순간
            {
                speaker: 'narration',
                text: '하지만 그 다음 말은 전혀 알아들을 수가 없었다...',
                textJp: 'しかしその次の言葉は全然聞き取れなかった...'
            },
            {
                speaker: 'narration',
                text: '하나도 못 알아듣겠어!',
                textJp: '全然聞き取れないよ！'
            },
            {
                speaker: 'narration',
                text: '큰일났다. 연애는커녕 말 한마디도 못 섞어보고 한국으로 돌아가게 생겼잖아!',
                textJp: 'やばい。恋愛どころか、一言も喋れずに韓国に帰ることになっちゃう！'
            },
            // 퀴즈 2: 기본 인사
            {
                speaker: 'quiz',
                question: '일본에서 살아남으려면 기본 인사부터! "안녕하세요"는 일본어로?',
                options: [
                    'さようなら',
                    'おやすみ',
                    'こんにちは',
                    'いただきます'
                ],
                meanings: [
                    '잘 가',
                    '잘 자',
                    '안녕하세요',
                    '잘 먹겠습니다'
                ],
                correct: 2
            },
            {
                speaker: 'narration',
                text: '그래, "こんにちは"! 이것부터 제대로 시작하자!',
                textJp: 'そう、「こんにちは」！これからちゃんと始めよう！',
                condition: 'correct'
            },
            {
                speaker: 'narration',
                text: '"こんにちは"가 안녕하세요구나... 기본부터 다시 배워야겠어.',
                textJp: '「こんにちは」がこんにちはか... 基本から勉強し直そう。',
                condition: 'wrong'
            },
            // 결심
            {
                speaker: 'narration',
                text: '좋아, 결심했어.',
                textJp: 'よし、決めたぞ。'
            },
            {
                speaker: 'narration',
                text: '일본어 공부를 제대로 시작하는 거야.',
                textJp: '日本語の勉強を本気で始めるんだ。'
            },
            {
                speaker: 'narration',
                text: '공부하다 보면… 내 운명의 상대도 나타나겠지?',
                textJp: '勉強していれば… 僕の運命の人も現れるよね？'
            },
            // 퀴즈 3: 감사 표현
            {
                speaker: 'quiz',
                question: '일본어 공부 결심! 먼저 "감사합니다"는 뭘까?',
                options: [
                    'ごめんなさい',
                    'ありがとうございます',
                    'おねがいします',
                    'すみません'
                ],
                meanings: [
                    '미안해요',
                    '고맙습니다',
                    '부탁합니다',
                    '실례합니다'
                ],
                correct: 1
            },
            {
                speaker: 'narration',
                text: '"ありがとうございます"! 감사의 마음은 어디서나 통하는 법이지!',
                textJp: '「ありがとうございます」！感謝の気持ちはどこでも通じるんだ！',
                condition: 'correct'
            },
            {
                speaker: 'narration',
                text: '감사합니다는 "ありがとうございます"... 이것도 외워야겠다.',
                textJp: 'ありがとうございますは「ありがとうございます」... これも覚えよう。',
                condition: 'wrong'
            },
            // 타이틀 로고
            {
                speaker: 'narration',
                text: '이렇게, 내 운명을 바꿀 일본어 공부가 시작되었다.',
                textJp: 'こうして、僕の運命を変える日本語の勉強が始まった。'
            },
            {
                speaker: 'title',
                text: '코이벤: 사랑하며 배우는 일본어',
                textJp: 'Koiben: 恋して学ぶ日本語'
            },
        ]
    },

    // ============================================
    // Stage 1: School - Hana (하나)
    // 난이도: ★☆☆ (기초)
    // 성격: 귀여운 일본 여사친, 활발하고 친근함
    // 학습: 히라가나, 기본 인사, 학교 단어
    // ============================================
    stage1: {
        background: bgSchool,
        girl: 'girl1',
        title: '하나 - 학교에서의 만남',
        dialogues: [
            // 프롤로그
            {
                speaker: 'narration',
                text: '4월, 벚꽃이 흩날리는 일본의 봄...',
                textJp: '四月、桜が舞い散る日本の春...'
            },
            {
                speaker: 'narration',
                text: '한국에서 온 교환학생인 나는 긴장된 마음으로 새 교실에 들어섰다.',
                textJp: '韓国から来た交換留学生の僕は、緊張しながら新しい教室に入った。'
            },

            // 첫 만남
            {
                speaker: 'girl1',
                text: '앗! 너 혹시 한국에서 온 교환학생?!',
                textJp: 'あっ！もしかして韓国から来た交換留学生？！'
            },
            {
                speaker: 'girl1',
                text: '와아~ 진짜다! 나 한국 드라마 엄청 좋아하거든!',
                textJp: 'わあ～本当だ！私、韓国ドラマめっちゃ好きなんだよ！'
            },
            {
                speaker: 'girl1',
                text: '아, 자기소개가 늦었다! 나는 하나야! 꽃 花 써서 하나!',
                textJp: 'あ、自己紹介遅れちゃった！私ははなだよ！花って書いてはな！'
            },
            {
                speaker: 'girl1',
                text: '너도 이름 알려줘~ 뭐라고 불러?',
                textJp: 'あなたも名前教えて～なんて呼べばいい？'
            },

            // 퀴즈 1: 첫 인사
            {
                speaker: 'quiz',
                question: '귀여운 하나에게 첫 인사를 하려고 해. 뭐라고 말할까?',
                options: [
                    'はじめまして',
                    'さようなら',
                    'ごめんなさい',
                    'いただきます'
                ],
                meanings: [
                    '처음 뵙겠습니다',
                    '잘 가',
                    '미안해요',
                    '잘 먹겠습니다'
                ],
                correct: 0
            },
            {
                speaker: 'girl1',
                text: '오오~! 일본어 할 줄 아는구나! 발음도 진짜 귀여워...!',
                textJp: 'おお～！日本語できるんだ！発音もめっちゃ可愛い...！',
                condition: 'correct'
            },
            {
                speaker: 'girl1',
                text: '에헤헤, 그건 아닌데~ 처음 만났을 땐 "はじめまして"야!',
                textJp: 'えへへ、それは違うよ～初めて会った時は「はじめまして」だよ！',
                condition: 'wrong'
            },

            // 친해지기
            {
                speaker: 'girl1',
                text: '있잖아~ 내가 학교 안내해줄까? 둘이서!',
                textJp: 'ねえねえ～私が学校案内してあげようか？二人で！'
            },
            {
                speaker: 'girl1',
                text: '어때? 나랑 같이 돌아볼래?',
                textJp: 'どう？私と一緒に回ってみる？'
            },

            // 퀴즈 2: 하나의 제안에 응답
            {
                speaker: 'quiz',
                question: '하나가 설레는 눈빛으로 바라보고 있다. 뭐라고 대답할까?',
                options: [
                    'いやだ',
                    'うん、お願い！',
                    'ちょっと...',
                    '関係ない'
                ],
                meanings: [
                    '싫어',
                    '응, 부탁해!',
                    '좀...',
                    '상관없어'
                ],
                correct: 1
            },
            {
                speaker: 'girl1',
                text: '야호~! 그럼 출발이다! 손... 잡아도 돼? 길 잃으면 안 되니까!',
                textJp: 'やったー！じゃあ出発！手...繋いでもいい？迷子になったら大変だから！',
                condition: 'correct'
            },
            {
                speaker: 'girl1',
                text: '에엥...? 싫어...? 나랑 같이 다니는 거...',
                textJp: 'ええ...？嫌...？私と一緒にいるの...',
                condition: 'wrong'
            },

            // 학교 투어
            {
                speaker: 'girl1',
                text: '여기가 우리 교실이고~ 저기 보이는 게 도서관이야!',
                textJp: 'ここが私たちの教室で～あそこに見えるのが図書館だよ！'
            },
            {
                speaker: 'girl1',
                text: '아, 맞다! 퀴즈~ 도서관은 일본어로 뭘까?',
                textJp: 'あ、そうだ！クイズ～図書館は日本語で何でしょう？'
            },

            // 퀴즈 3: 학교 장소
            {
                speaker: 'quiz',
                question: '하나가 귀엽게 고개를 갸웃거리며 기다린다.',
                options: [
                    'きょうしつ',
                    'たいいくかん',
                    'としょかん',
                    'しょくどう'
                ],
                meanings: [
                    '교실',
                    '체육관',
                    '도서관',
                    '식당'
                ],
                correct: 2
            },
            {
                speaker: 'girl1',
                text: '딩동댕~! 정답! 역시 똑똒하다~! 머리 쓰다듬어줄까?',
                textJp: 'ピンポーン！正解！やっぱり頭いい～！頭撫でてあげようか？',
                condition: 'correct'
            },
            {
                speaker: 'girl1',
                text: '아쉬워~ "としょかん"이야! 다음엔 맞춰봐~',
                textJp: '残念～「としょかん」だよ！次は当ててね～',
                condition: 'wrong'
            },

            // 점심시간
            {
                speaker: 'narration',
                text: '어느새 점심시간이 됐다. 하나가 도시락을 꺼낸다.',
                textJp: 'いつの間にか昼休みになった。はなはお弁当を取り出す。'
            },
            {
                speaker: 'girl1',
                text: '자자~ 나 오늘 도시락 엄청 맛있게 싸왔거든!',
                textJp: 'じゃじゃ～私、今日のお弁当めっちゃ美味しく作ってきたんだ！'
            },
            {
                speaker: 'girl1',
                text: '같이 먹자! 여기 앉아~ 내 옆자리!',
                textJp: '一緒に食べよ！ここ座って～私の隣！'
            },

            // 퀴즈 4: 음식 권유에 응답
            {
                speaker: 'quiz',
                question: '하나가 계란말이를 젓가락으로 집어서 내 앞에 내밀었다. 뭐라고 할까?',
                options: [
                    'ありがとう',
                    'すみません',
                    'おはよう',
                    'さよなら'
                ],
                meanings: [
                    '고마워',
                    '실례합니다',
                    '좋은 아침',
                    '잘 가'
                ],
                correct: 0
            },
            {
                speaker: 'girl1',
                text: '에헤헤~ 맛있어? 내가 직접 만든 거야! ...거짓말, 엄마가 만들었어.',
                textJp: 'えへへ～美味しい？私が作ったんだよ！...嘘、お母さんが作った。',
                condition: 'correct'
            },
            {
                speaker: 'girl1',
                text: '고마울 땐 "ありがとう"야~ 자, 따라해봐!',
                textJp: '嬉しい時は「ありがとう」だよ～さあ、言ってみて！',
                condition: 'wrong'
            },

            // 오후 수업
            {
                speaker: 'girl1',
                text: '앗, 다음 수업 시작이다! 빨리 교실 가자!',
                textJp: 'あっ、次の授業始まる！早く教室行こう！'
            },
            {
                speaker: 'girl1',
                text: '손...! 아, 아니 그냥 빨리 가자는 거야!',
                textJp: '手...！あ、ううん何でもない早く行こうってこと！'
            },

            // 퀴즈 5: 서두르기
            {
                speaker: 'quiz',
                question: '하나가 얼굴을 붉히며 서두른다. "빨리!"는 일본어로?',
                options: [
                    'ゆっくり',
                    'しずかに',
                    'げんきに',
                    'はやく'
                ],
                meanings: [
                    '천천히',
                    '조용히',
                    '건강하게',
                    '빨리'
                ],
                correct: 3
            },
            {
                speaker: 'girl1',
                text: '오오! 맞아맞아! "はやく"! 자, はやく はやく~!',
                textJp: 'おお！そうそう！「はやく」！さあ、はやく はやく～！',
                condition: 'correct'
            },
            {
                speaker: 'girl1',
                text: '"はやく"가 빨리야! 자, はやく~!',
                textJp: '「はやく」が早くだよ！さあ、はやく～！',
                condition: 'wrong'
            },

            // 방과 후
            {
                speaker: 'narration',
                text: '방과 후, 하나가 내 책상 앞에 와서 섰다.',
                textJp: '放課後、はなが私の机の前に来て立った。'
            },
            {
                speaker: 'girl1',
                text: '있잖아... 오늘 진짜 재밌었어.',
                textJp: 'ねえ...今日、本当に楽しかった。'
            },
            {
                speaker: 'girl1',
                text: '너랑 같이 있으니까 학교 오길 잘했다고 생각해...',
                textJp: 'あなたと一緒にいたら学校に来てよかったって思う...'
            },

            // 퀴즈 6: 감정 표현
            {
                speaker: 'quiz',
                question: '하나가 수줍게 고백하고 있다. "나도 즐거웠어"라고 말하려면?',
                options: [
                    'わたしも楽しかった',
                    'つまらなかった',
                    'わからない',
                    'どうでもいい'
                ],
                meanings: [
                    '나도 즐거웠어',
                    '지루했어',
                    '모르겠어',
                    '상관없어'
                ],
                correct: 0
            },
            {
                speaker: 'girl1',
                text: '...! 진짜?! 에헤헤... 나만 그런 게 아니었구나...',
                textJp: '...！本当？！えへへ...私だけじゃなかったんだ...',
                condition: 'correct'
            },
            {
                speaker: 'girl1',
                text: '에헤헤... "わたしも楽しかった"는 나도 즐거웠다는 뜻이야!',
                textJp: 'えへへ...「わたしも楽しかった」は私も楽しかったって意味だよ！',
                condition: 'wrong'
            },

            // 약속
            {
                speaker: 'girl1',
                text: '그, 그래서 말인데...! 우리 내일도 같이 점심 먹을래?',
                textJp: 'そ、それでね...！私たち明日も一緒にお昼食べない？'
            },
            {
                speaker: 'girl1',
                text: '아, 아니 매일! 매일 같이 먹자...!',
                textJp: 'あ、ううん毎日！毎日一緒に食べよう...！'
            },

            // 퀴즈 7: 약속
            {
                speaker: 'quiz',
                question: '하나가 두 손을 꼭 모으고 기대에 찬 눈으로 바라본다. 뭐라고 할까?',
                options: [
                    'いやだ',
                    'うん、約束！',
                    '無理',
                    '知らない'
                ],
                meanings: [
                    '싫어',
                    '응, 약속!',
                    '무리야',
                    '몰라'
                ],
                correct: 1
            },
            {
                speaker: 'girl1',
                text: 'やった~! 약속이다! 절대 어기면 안 돼?!',
                textJp: 'やった～！約束だよ！絶対破っちゃダメだからね？！',
                condition: 'correct'
            },
            {
                speaker: 'girl1',
                text: '에엥...? 싫어...? 나랑 밥 먹는 거...?',
                textJp: 'ええ...？嫌...？私とご飯食べるの...？',
                condition: 'wrong'
            },

            // 헤어짐
            {
                speaker: 'girl1',
                text: '그럼 나 먼저 갈게! 집 조심해서 가~',
                textJp: 'じゃあ私先に行くね！家まで気をつけて～'
            },
            {
                speaker: 'girl1',
                text: '아, 근데 마지막으로 한 가지만~!',
                textJp: 'あ、でも最後に一つだけ～！'
            },

            // 퀴즈 8: 헤어질 때
            {
                speaker: 'quiz',
                question: '하나가 뒤돌아서며 손을 흔든다. 헤어질 때 인사는?',
                options: [
                    'またね',
                    'おはよう',
                    'いただきます',
                    'ごちそうさま'
                ],
                meanings: [
                    '또 봐',
                    '좋은 아침',
                    '잘 먹겠습니다',
                    '잘 먹었습니다'
                ],
                correct: 0
            },
            {
                speaker: 'girl1',
                text: '응응! またね~! 내일 꼭 봐! 기다릴게!',
                textJp: 'うんうん！またね～！明日絶対会おうね！待ってる！',
                condition: 'correct'
            },
            {
                speaker: 'girl1',
                text: '에헤헤, 헤어질 땐 "またね"야! 귀엽게 말해봐~',
                textJp: 'えへへ、別れる時は「またね」だよ！可愛く言ってみて～',
                condition: 'wrong'
            },

            // 하나의 비밀
            {
                speaker: 'girl1',
                text: '아 그리고...! 이건 비밀인데...',
                textJp: 'あ、それと...！これは秘密なんだけど...'
            },
            {
                speaker: 'girl1',
                text: '나... 사실 오늘 아침부터 교환학생 온다고 해서 엄청 설렜거든...!',
                textJp: '私...実は今朝から交換留学生来るって聞いてめっちゃドキドキしてたの...！'
            },

            // 퀴즈 9: 하나의 고백
            {
                speaker: 'quiz',
                question: '하나가 얼굴을 붉히며 말한다. "두근두근"은 일본어로?',
                options: [
                    'ワクワク',
                    'イライラ',
                    'ドキドキ',
                    'メソメソ'
                ],
                meanings: [
                    '두근두근(설렘)',
                    '짜증',
                    '두근두근',
                    '훌쩍훌쩍'
                ],
                correct: 2
            },
            {
                speaker: 'girl1',
                text: '어?! 알아?! 그래, 지금도 ドキドキ해... 너 때문에...',
                textJp: 'え？！知ってる？！そう、今もドキドキしてる...あなたのせいで...',
                condition: 'correct'
            },
            {
                speaker: 'girl1',
                text: 'ドキドキ는 두근두근이야! 지금 내 심장이 그래...',
                textJp: 'ドキドキは胸がドキドキするってこと！今私の心臓がそう...',
                condition: 'wrong'
            },

            // 스테이지 1 엔딩
            {
                speaker: 'girl1',
                text: '으앙, 왜 이런 말까지 해버린 거야~! 창피해...!',
                textJp: 'うわあ、なんでこんなこと言っちゃったの～！恥ずかしい...！'
            },
            {
                speaker: 'girl1',
                text: '아무튼! 내일 봐! 좋아... 아니 またね!',
                textJp: 'とにかく！明日ね！好き...ううん、またね！'
            },

            // 퀴즈 10: 하나의 마음
            {
                speaker: 'quiz',
                question: '하나가 방금 무슨 말을 하려다 멈췄을까? "좋아해"는 일본어로?',
                options: [
                    'きらい',
                    'ふつう',
                    'わからない',
                    'すき'
                ],
                meanings: [
                    '싫어',
                    '보통이야',
                    '몰라',
                    '좋아해'
                ],
                correct: 3
            },
            {
                speaker: 'girl1',
                text: '~~~?! 안 들었지?! 아무것도 안 들었지?! 으아앙!',
                textJp: '~~~？！聞いてないよね？！何も聞いてないよね？！うわあん！',
                condition: 'correct'
            },
            {
                speaker: 'girl1',
                text: '에헤헤... 다행이다 모르는구나... 언젠간 알려줄게...!',
                textJp: 'えへへ...よかった知らないんだ...いつか教えてあげる...！',
                condition: 'wrong'
            },

            {
                speaker: 'narration',
                text: '하나의 밝은 미소와 붉어진 뺨이 눈에 아른거린다. 내일이 기다려진다.',
                textJp: 'はなの明るい笑顔と赤くなった頬が目に浮かぶ。明日が待ち遠しい。'
            },
        ]
    },

    // ============================================
    // Stage 2: Village - Misaki (미사키)
    // 난이도: ★★☆ (중급)
    // 성격: 차분하고 지적인 어른스러운 분위기
    // 학습: 가타카나, 동사 활용, 일상 회화
    // ============================================
    stage2: {
        background: bgVillage,
        girl: 'girl2',
        title: '미사키 - 마을에서의 만남',
        dialogues: [
            // 프롤로그
            {
                speaker: 'narration',
                text: '주말 오후, 마을 서점에서 일본어 교재를 찾고 있었다.',
                textJp: '週末の午後、町の本屋で日本語の教材を探していた。'
            },
            {
                speaker: 'narration',
                text: '책장 사이에서 긴 생머리의 여학생과 눈이 마주쳤다.',
                textJp: '本棚の間で長い黒髪の女子学生と目が合った。'
            },

            // 첫 만남
            {
                speaker: 'girl2',
                text: '...혹시, 뭔가 찾고 있나요?',
                textJp: '...もしかして、何か探していますか？'
            },
            {
                speaker: 'girl2',
                text: '아... 그 억양, 한국에서 오신 분이군요.',
                textJp: 'あ...そのアクセント、韓国から来た方ですね。'
            },
            {
                speaker: 'girl2',
                text: '저는 미사키라고 해요. 이 서점에 자주 와요.',
                textJp: '私は美咲といいます。この本屋によく来るんです。'
            },
            {
                speaker: 'girl2',
                text: '...도움이 필요하시면, 제가 도와드릴까요?',
                textJp: '...お手伝いが必要でしたら、私がお手伝いしましょうか？'
            },

            // 퀴즈 1: 정중한 응답
            {
                speaker: 'quiz',
                question: '미사키가 조용히 미소 지으며 기다린다. 정중하게 부탁하려면?',
                options: [
                    'お願いします',
                    'うん',
                    'いいよ',
                    'まあね'
                ],
                meanings: [
                    '부탁합니다',
                    '응',
                    '좋아',
                    '글쎄'
                ],
                correct: 0
            },
            {
                speaker: 'girl2',
                text: '...네, 기꺼이요. 정중하게 말씀하시네요. 마음에 들어요.',
                textJp: '...はい、喜んで。丁寧に話しますね。気に入りました。',
                condition: 'correct'
            },
            {
                speaker: 'girl2',
                text: '...처음 만난 분께는 "お願いします"가 좋아요.',
                textJp: '...初めて会った方には「お願いします」がいいですよ。',
                condition: 'wrong'
            },

            // 서점에서
            {
                speaker: 'girl2',
                text: '이 책은 어떨까요? 저도 한국어 공부할 때 비슷한 책으로 시작했어요.',
                textJp: 'この本はどうですか？私も韓国語を勉強する時、似た本で始めました。'
            },
            {
                speaker: 'girl2',
                text: '...한국어를 조금 할 수 있어요. 책으로 독학했거든요.',
                textJp: '...韓国語を少しできます。本で独学したんです。'
            },

            // 퀴즈 2: 칭찬하기
            {
                speaker: 'quiz',
                question: '미사키가 수줍게 시선을 내린다. "대단해요"라고 칭찬하려면?',
                options: [
                    'つまらない',
                    'すごいですね',
                    'どうでもいい',
                    'わからない'
                ],
                meanings: [
                    '시시해',
                    '대단하네요',
                    '아무래도 좋아',
                    '모르겠어'
                ],
                correct: 1
            },
            {
                speaker: 'girl2',
                text: '...그런 말씀 들으니 기쁘네요. 감사합니다.',
                textJp: '...そう言ってもらえると嬉しいです。ありがとうございます。',
                condition: 'correct'
            },
            {
                speaker: 'girl2',
                text: '...칭찬할 때는 "すごいですね"라고 해요.',
                textJp: '...褒める時は「すごいですね」と言います。',
                condition: 'wrong'
            },

            // 찻집 제안
            {
                speaker: 'girl2',
                text: '...있잖아요, 이 근처에 제가 자주 가는 찻집이 있어요.',
                textJp: '...あのですね、この近くに私がよく行くお茶屋さんがあるんです。'
            },
            {
                speaker: 'girl2',
                text: '거기서 차 마시면서... 더 이야기할 수 있을까요?',
                textJp: 'そこでお茶を飲みながら...もっとお話できますか？'
            },
            {
                speaker: 'girl2',
                text: '...아, 갑자기 이런 말 하면 이상하죠? 죄송해요...',
                textJp: '...あ、急にこんなこと言ったら変ですよね？すみません...'
            },

            // 퀴즈 3: 가고 싶다 표현
            {
                speaker: 'quiz',
                question: '미사키가 불안한 듯 손을 만지작거린다. "가고 싶어요"라고 하려면?',
                options: [
                    '行きたいです',
                    '行きます',
                    '行きました',
                    '行きません'
                ],
                meanings: [
                    '가고 싶어요',
                    '갑니다',
                    '갔습니다',
                    '가지 않습니다'
                ],
                correct: 0
            },
            {
                speaker: 'girl2',
                text: '...! 정말요? 다행이에요... 사실 좀 긴장했어요.',
                textJp: '...！本当ですか？よかった...実は少し緊張してました。',
                condition: 'correct'
            },
            {
                speaker: 'girl2',
                text: '"~たい"를 붙이면 "~하고 싶다"가 돼요. 기억해두세요.',
                textJp: '「～たい」をつけると「～したい」になります。覚えておいてください。',
                condition: 'wrong'
            },

            // 찻집에서
            {
                speaker: 'narration',
                text: '미사키와 함께 조용한 찻집에 들어섰다.',
                textJp: '美咲と一緒に静かなお茶屋さんに入った。'
            },
            {
                speaker: 'girl2',
                text: '여기 말차가 맛있어요. 드셔보실래요?',
                textJp: 'ここの抹茶が美味しいんです。召し上がってみますか？'
            },
            {
                speaker: 'girl2',
                text: '...아, 메뉴판 읽을 수 있어요? 가타카나가 좀 있는데...',
                textJp: '...あ、メニュー読めますか？カタカナが少しあるんですけど...'
            },

            // 퀴즈 4: 가타카나 읽기
            {
                speaker: 'quiz',
                question: '메뉴판에 "ケーキ"라고 써있다. 무슨 뜻일까?',
                options: [
                    '커피',
                    '쿠키',
                    '코코아',
                    '케이크'
                ],
                correct: 3
            },
            {
                speaker: 'girl2',
                text: '...맞아요. 가타카나도 읽으시는군요. 놀랐어요.',
                textJp: '...そうです。カタカナも読めるんですね。驚きました。',
                condition: 'correct'
            },
            {
                speaker: 'girl2',
                text: '가타카나는 외래어에 많이 써요. ケーキ는 케이크예요.',
                textJp: 'カタカナは外来語によく使います。ケーキはケーキですよ。',
                condition: 'wrong'
            },

            // 대화 심화
            {
                speaker: 'girl2',
                text: '...저, 사실 친구가 별로 없어요.',
                textJp: '...私、実は友達があまりいないんです。'
            },
            {
                speaker: 'girl2',
                text: '책 읽는 게 좋아서... 혼자 있는 시간이 많았거든요.',
                textJp: '本を読むのが好きで...一人でいる時間が多かったんです。'
            },
            {
                speaker: 'girl2',
                text: '근데 당신이랑은... 왠지 편하게 얘기할 수 있어요.',
                textJp: 'でもあなたとは...なんだか楽に話せるんです。'
            },

            // 퀴즈 5: 감정 공감
            {
                speaker: 'quiz',
                question: '미사키가 조심스럽게 속마음을 털어놓는다. "나도 그래요"라고 하려면?',
                options: [
                    'わたしもそうです',
                    'そうですか',
                    '知りません',
                    '関係ない'
                ],
                meanings: [
                    '저도 그래요',
                    '그런가요',
                    '몰라요',
                    '관계없어요'
                ],
                correct: 0
            },
            {
                speaker: 'girl2',
                text: '...정말요? 그럼 우리... 비슷한 거네요. (살짝 미소)',
                textJp: '...本当ですか？じゃあ私たち...似てますね。(少し微笑む)',
                condition: 'correct'
            },
            {
                speaker: 'girl2',
                text: '공감할 때는 "わたしもそうです"라고 해요.',
                textJp: '共感する時は「わたしもそうです」と言います。',
                condition: 'wrong'
            },

            // 저녁이 다가온다
            {
                speaker: 'narration',
                text: '어느새 창밖이 노을빛으로 물들어가고 있었다.',
                textJp: 'いつの間にか窓の外が夕焼け色に染まっていた。'
            },
            {
                speaker: 'girl2',
                text: '...벌써 이런 시간이네요. 시간이 빨리 갔어요.',
                textJp: '...もうこんな時間ですね。時間が早く過ぎました。'
            },
            {
                speaker: 'girl2',
                text: '당신과 함께라서... 즐거웠어요.',
                textJp: 'あなたと一緒だったから...楽しかったです。'
            },

            // 퀴즈 6: 형용사 과거
            {
                speaker: 'quiz',
                question: '미사키의 뺨이 살짝 붉어졌다. "즐거웠어요"는 일본어로?',
                options: [
                    '楽しかったです',
                    '楽しいです',
                    '楽しくないです',
                    '楽しみです'
                ],
                meanings: [
                    '즐거웠어요',
                    '즐거워요',
                    '즐겁지 않아요',
                    '기대돼요'
                ],
                correct: 0
            },
            {
                speaker: 'girl2',
                text: '...네, 저도요. 오랜만에 이렇게 楽しかった어요.',
                textJp: '...はい、私もです。久しぶりにこんなに楽しかったです。',
                condition: 'correct'
            },
            {
                speaker: 'girl2',
                text: '"楽しい"의 과거형은 "楽しかった"예요.',
                textJp: '「楽しい」の過去形は「楽しかった」ですよ。',
                condition: 'wrong'
            },

            // 비밀 장소
            {
                speaker: 'girl2',
                text: '...저기, 시간 괜찮으시면... 보여드리고 싶은 곳이 있어요.',
                textJp: '...あの、時間大丈夫でしたら...見せたい場所があるんです。'
            },
            {
                speaker: 'girl2',
                text: '저만 아는 비밀 장소예요. 아무에게도 알려준 적 없는...',
                textJp: '私だけが知っている秘密の場所です。誰にも教えたことない...'
            },

            // 퀴즈 7: 함께 가기
            {
                speaker: 'quiz',
                question: '미사키가 처음으로 비밀을 공유하려 한다. "같이 가요"라고 하려면?',
                options: [
                    '一緒に行きましょう',
                    '一人で行って',
                    '行きたくない',
                    '無理です'
                ],
                meanings: [
                    '같이 갑시다',
                    '혼자 가세요',
                    '가고 싶지 않아요',
                    '무리입니다'
                ],
                correct: 0
            },
            {
                speaker: 'girl2',
                text: '...! 네... 가요, 같이. (손을 살짝 잡으며)',
                textJp: '...！はい...行きましょう、一緒に。(手を少し握りながら)',
                condition: 'correct'
            },
            {
                speaker: 'girl2',
                text: '...그렇군요. 다음 기회에...',
                textJp: '...そうですか。また今度...',
                condition: 'wrong'
            },

            // 언덕 위
            {
                speaker: 'narration',
                text: '미사키가 데려간 곳은 마을이 한눈에 내려다보이는 언덕이었다.',
                textJp: '美咲が連れて行った場所は町が一望できる丘だった。'
            },
            {
                speaker: 'girl2',
                text: '...예쁘죠? 여기서 보는 노을이 정말 좋아요.',
                textJp: '...綺麗でしょう？ここから見る夕焼けが本当に好きなんです。'
            },
            {
                speaker: 'girl2',
                text: '처음으로... 누군가와 함께 보네요, 이 풍경.',
                textJp: '初めて...誰かと一緒に見ますね、この景色。'
            },

            // 퀴즈 8: 아름다움 표현
            {
                speaker: 'quiz',
                question: '노을에 물든 미사키의 옆모습이 아름답다. "예뻐요"라고 하려면?',
                options: [
                    'きたない',
                    'こわい',
                    'きれいです',
                    'つまらない'
                ],
                meanings: [
                    '더러워',
                    '무서워',
                    '예뻐요',
                    '시시해'
                ],
                correct: 2
            },
            {
                speaker: 'girl2',
                text: '...에? 저, 저요...? (얼굴이 빨개지며) ...감사합니다.',
                textJp: '...え？わ、私...？(顔が赤くなって) ...ありがとうございます。',
                condition: 'correct'
            },
            {
                speaker: 'girl2',
                text: '"きれい"는 예쁘다는 뜻이에요...',
                textJp: '「きれい」は綺麗という意味ですよ...',
                condition: 'wrong'
            },

            // 고백
            {
                speaker: 'girl2',
                text: '...있잖아요. 저... 앞으로도 이렇게 만날 수 있을까요?',
                textJp: '...あのですね。私...これからもこうやって会えますか？'
            },
            {
                speaker: 'girl2',
                text: '당신과 함께 있으면... 심장이 이상하게 뛰어요.',
                textJp: 'あなたと一緒にいると...心臓が変にドキドキするんです。'
            },

            // 퀴즈 9: 약속
            {
                speaker: 'quiz',
                question: '미사키가 떨리는 목소리로 말한다. "또 만나요"라고 하려면?',
                options: [
                    'また会いましょう',
                    'もう会わない',
                    '会いたくない',
                    'さようなら'
                ],
                meanings: [
                    '또 만나요',
                    '이제 안 만나',
                    '만나고 싶지 않아',
                    '잘 가요'
                ],
                correct: 0
            },
            {
                speaker: 'girl2',
                text: '...네. 약속이에요. 꼭... 또 만나요.',
                textJp: '...はい。約束です。必ず...また会いましょう。',
                condition: 'correct'
            },
            {
                speaker: 'girl2',
                text: '...그렇군요. 아쉽네요...',
                textJp: '...そうですか。残念ですね...',
                condition: 'wrong'
            },

            // 스테이지 2 엔딩
            {
                speaker: 'girl2',
                text: '...오늘, 정말 행복했어요.',
                textJp: '...今日、本当に幸せでした。'
            },
            {
                speaker: 'girl2',
                text: '당신을 만난 건... 제 인생에서 가장 좋은 일인 것 같아요.',
                textJp: 'あなたに会えたこと...私の人生で一番いいことかもしれません。'
            },

            // 퀴즈 10: 미사키의 마음
            {
                speaker: 'quiz',
                question: '미사키가 눈을 감고 속삭인다. "좋아해요"는 일본어로?',
                options: [
                    '嫌いです',
                    '普通です',
                    '分かりません',
                    '好きです'
                ],
                meanings: [
                    '싫어해요',
                    '보통이에요',
                    '모르겠어요',
                    '좋아해요'
                ],
                correct: 3
            },
            {
                speaker: 'girl2',
                text: '...들렸나요? ...아직, 아직 말 안 했는데... (새빨개지며)',
                textJp: '...聞こえました？...まだ、まだ言ってないのに...(真っ赤になって)',
                condition: 'correct'
            },
            {
                speaker: 'girl2',
                text: '...다행이에요, 안 들렸군요. 언젠가... 꼭 말할게요.',
                textJp: '...よかった、聞こえなかったんですね。いつか...必ず言います。',
                condition: 'wrong'
            },

            {
                speaker: 'narration',
                text: '미사키의 고요한 미소가 노을빛에 물들어 더욱 아름다웠다. 가슴이 따뜻해진다.',
                textJp: '美咲の静かな微笑みが夕焼けに染まってより美しかった。胸が温かくなる。'
            },
        ]
    },

    // ============================================
    // Stage 3: Cafe - Hinata (히나타)
    // 난이도: ★★★ (고급)
    // 성격: 새침한 양아치, 부끄러움 많은 반전매력
    // 학습: 존경어/겸양어, 비즈니스 회화, 구어체
    // ============================================
    stage3: {
        background: bgCafe,
        girl: 'girl3',
        title: '히나타 - 카페에서의 만남',
        dialogues: [
            // 프롤로그
            {
                speaker: 'narration',
                text: '마을의 작은 카페에 들어섰다. 카운터에 알바생이 서있다.',
                textJp: '町の小さなカフェに入った。カウンターにバイトが立っている。'
            },
            {
                speaker: 'narration',
                text: '짧은 머리에 날카로운 눈매. 어딘가 접근하기 어려운 분위기.',
                textJp: '短い髪に鋭い目つき。どこか近寄りがたい雰囲気。'
            },

            // 첫 만남
            {
                speaker: 'girl3',
                text: '...어, 손님? 뭐 멍하니 서있어.',
                textJp: '...あ、お客さん？何ぼーっと立ってんの。'
            },
            {
                speaker: 'girl3',
                text: '주문할 거야 말 거야? 바쁘거든.',
                textJp: '注文するのしないの？忙しいんだけど。'
            },
            {
                speaker: 'girl3',
                text: '...뭐야 그 표정. 일본어 못 알아들어?',
                textJp: '...何その顔。日本語分かんないの？'
            },

            // 퀴즈 1: 접객 표현 이해
            {
                speaker: 'quiz',
                question: '히나타가 퉁명스럽게 "ご注文はお決まりですか"라고 했다. 무슨 뜻?',
                options: [
                    '주문 정하셨나요?',
                    '맛있게 드셨나요?',
                    '자리 있으신가요?',
                    '예약하셨나요?'
                ],
                correct: 0
            },
            {
                speaker: 'girl3',
                text: '...헐, 알아들어? 좀 하네. (살짝 놀란 표정)',
                textJp: '...へえ、分かるんだ。結構やるじゃん。(少し驚いた顔)',
                condition: 'correct'
            },
            {
                speaker: 'girl3',
                text: '...주문 정했냐고. 이것도 모르면 곤란한데?',
                textJp: '...注文決まったかって。これも分かんないと困るんだけど？',
                condition: 'wrong'
            },

            // 주문하기
            {
                speaker: 'girl3',
                text: '그래서? 뭐 마실 건데. 추천은 아메리카노.',
                textJp: 'で？何飲むの。おすすめはアメリカーノ。'
            },
            {
                speaker: 'girl3',
                text: '...왜 그렇게 봐? 맛있거든, マジで.',
                textJp: '...何そんな見てんの？美味しいんだから、マジで。'
            },

            // 퀴즈 2: 구어체
            {
                speaker: 'quiz',
                question: '"マジで"는 무슨 뜻일까?',
                options: [
                    '거짓말',
                    '진짜로',
                    '잠깐만',
                    '그만해'
                ],
                correct: 1
            },
            {
                speaker: 'girl3',
                text: '...오, 구어체도 알아? 어디서 배운 거야?',
                textJp: '...お、口語体も分かるの？どこで覚えたの？',
                condition: 'correct'
            },
            {
                speaker: 'girl3',
                text: '"マジで"는 진짜로야. 젊은 애들 많이 쓰거든.',
                textJp: '「マジで」は本当にって意味。若い子よく使うから。',
                condition: 'wrong'
            },

            // 주문 선택
            {
                speaker: 'girl3',
                text: '...그래서 아메리카노 줄까 말까?',
                textJp: '...で、アメリカーノにする？しない？'
            },

            // 퀴즈 3: 주문하기
            {
                speaker: 'quiz',
                question: '히나타가 팔짱을 끼고 기다린다. "그걸로 할게요"라고 하려면?',
                options: [
                    'それにします',
                    'いらない',
                    '知らない',
                    'どうでもいい'
                ],
                meanings: [
                    '그걸로 할게요',
                    '필요 없어',
                    '몰라',
                    '상관없어'
                ],
                correct: 0
            },
            {
                speaker: 'girl3',
                text: '...훗, 순순히 듣네. 좀 의외다. (커피 만들며)',
                textJp: '...ふっ、素直に聞くんだ。ちょっと意外。(コーヒー作りながら)',
                condition: 'correct'
            },
            {
                speaker: 'girl3',
                text: '...뭐야, 싫어? 맛있다니까. (살짝 삐친 표정)',
                textJp: '...何、嫌なの？美味しいって言ってるのに。(少し拗ねた顔)',
                condition: 'wrong'
            },

            // 커피 만들면서
            {
                speaker: 'girl3',
                text: '...나 히나타. 여기 알바야. 근데 왜 혼자 왔어?',
                textJp: '...私ひなた。ここのバイト。ってか何で一人で来たの？'
            },
            {
                speaker: 'girl3',
                text: '...아, 한국에서 온 교환학생? 들은 적 있어.',
                textJp: '...あ、韓国から来た交換留学生？聞いたことある。'
            },
            {
                speaker: 'girl3',
                text: '...흥, 혼자 카페 오는 거 보니까 외로운 거 아냐? (비웃듯이)',
                textJp: '...ふん、一人でカフェ来るとか寂しいんじゃないの？(からかうように)'
            },

            // 퀴즈 4: 반격
            {
                speaker: 'quiz',
                question: '히나타가 놀리고 있다. "너도 혼자잖아"라고 받아치려면?',
                options: [
                    'そうだね',
                    'ごめん',
                    'きみも一人じゃん',
                    'うん'
                ],
                meanings: [
                    '그렇네',
                    '미안',
                    '너도 혼자잖아',
                    '응'
                ],
                correct: 2
            },
            {
                speaker: 'girl3',
                text: '...ㅎ?! 나, 나는 일하는 거거든?! (당황)',
                textJp: '...っ？！わ、私は仕事してるんだから？！(動揺)',
                condition: 'correct'
            },
            {
                speaker: 'girl3',
                text: '...뭐야, 순순히 인정하네. 좀 재미없잖아.',
                textJp: '...何、素直に認めるんだ。ちょっとつまんないじゃん。',
                condition: 'wrong'
            },

            // 손님 응대
            {
                speaker: 'narration',
                text: '다른 손님이 들어왔다. 히나타의 태도가 갑자기 바뀐다.',
                textJp: '他のお客さんが入ってきた。ひなたの態度が急に変わる。'
            },
            {
                speaker: 'girl3',
                text: 'いらっしゃいませ~ (갑자기 밝은 목소리)',
                textJp: 'いらっしゃいませ～(急に明るい声)'
            },

            // 퀴즈 5: 존경어
            {
                speaker: 'quiz',
                question: '"いらっしゃいませ"는 언제 쓰는 표현일까?',
                options: [
                    '손님을 맞이할 때',
                    '손님이 나갈 때',
                    '사과할 때',
                    '거절할 때'
                ],
                correct: 0
            },
            {
                speaker: 'girl3',
                text: '...오, 경어도 알아? 의외로 공부 좀 했네. (살짝 인정)',
                textJp: '...お、敬語も分かるの？意外と勉強してるじゃん。(少し認める)',
                condition: 'correct'
            },
            {
                speaker: 'girl3',
                text: '손님 올 때 쓰는 인사야. 가게 기본이거든.',
                textJp: 'お客さんが来た時に使う挨拶。お店の基本だから。',
                condition: 'wrong'
            },

            // 휴식 시간
            {
                speaker: 'girl3',
                text: '...하아, 드디어 휴식. (내 옆에 털썩 앉으며)',
                textJp: '...はあ、やっと休憩。(私の隣にドサッと座って)'
            },
            {
                speaker: 'girl3',
                text: '...뭐야 왜 봐. 다른 자리 없거든.',
                textJp: '...何見てんの。他の席ないんだから。'
            },
            {
                speaker: 'girl3',
                text: '...그, 그냥 앉은 거야. 딴 뜻 없어. (시선 회피)',
                textJp: '...た、ただ座っただけ。他意はない。(視線をそらす)'
            },

            // 퀴즈 6: 반말 이해
            {
                speaker: 'quiz',
                question: '히나타가 "他意はない"라고 했다. 무슨 뜻일까?',
                options: [
                    '다른 자리',
                    '다른 사람',
                    '다른 시간',
                    '다른 뜻 없어'
                ],
                correct: 3
            },
            {
                speaker: 'girl3',
                text: '...알긴 아네. 나 반말 쓰거든. 불편해?',
                textJp: '...分かるんだ。私タメ口使うから。嫌？',
                condition: 'correct'
            },
            {
                speaker: 'girl3',
                text: '다른 뜻 없다는 거야. ...진짜로.',
                textJp: '他の意味ないってこと。...マジで。',
                condition: 'wrong'
            },

            // 본심
            {
                speaker: 'girl3',
                text: '...있잖아. 너, 좀 신기해.',
                textJp: '...ねえ。あんた、ちょっと不思議。'
            },
            {
                speaker: 'girl3',
                text: '보통 남자들 나한테 잘 말 안 걸거든. 무서워 보인다고.',
                textJp: '普通男子、私にあんま話しかけないんだよね。怖く見えるって。'
            },
            {
                speaker: 'girl3',
                text: '...근데 너는 다르네. 좀... 신경 쓰여. (작은 소리로)',
                textJp: '...でもあんたは違うね。ちょっと...気になる。(小さい声で)'
            },

            // 퀴즈 7: 감정 표현
            {
                speaker: 'quiz',
                question: '히나타가 "気になる"라고 했다. 무슨 뜻일까?',
                options: [
                    '신경 쓰여',
                    '싫어',
                    '무서워',
                    '짜증나'
                ],
                correct: 0
            },
            {
                speaker: 'girl3',
                text: '...ㅎ?! 들, 들었어?! 아무것도 아니거든?!',
                textJp: '...っ？！き、聞こえた？！何でもないから？！',
                condition: 'correct'
            },
            {
                speaker: 'girl3',
                text: '신경 쓰인다는 거야... 뭐, 좋은 의미로.',
                textJp: '気になるってこと...まあ、いい意味で。',
                condition: 'wrong'
            },

            // 히나타의 반전
            {
                speaker: 'girl3',
                text: '...아, 잠깐. 이거 봐. (핸드폰을 보여주며)',
                textJp: '...あ、ちょっと。これ見て。(スマホを見せながら)'
            },
            {
                speaker: 'girl3',
                text: '...고양이 사진. 귀엽지 않아? ...뭐야 그 눈?!',
                textJp: '...猫の写真。可愛くない？...何その目？！'
            },
            {
                speaker: 'girl3',
                text: '웃으면 죽여. 나 고양이 좋아해도 되잖아...!',
                textJp: '笑ったら殺す。私が猫好きでもいいじゃん...！'
            },

            // 퀴즈 8: 귀여움 표현
            {
                speaker: 'quiz',
                question: '히나타가 부끄러워하며 고양이를 자랑한다. "귀여워"라고 하려면?',
                options: [
                    'こわい',
                    'かわいい',
                    'きもい',
                    'うざい'
                ],
                meanings: [
                    '무서워',
                    '귀여워',
                    '기분 나빠',
                    '짜증나'
                ],
                correct: 1
            },
            {
                speaker: 'girl3',
                text: '...! でしょ?! 이 고양이 진짜 天使거든...! (눈 반짝)',
                textJp: '...！でしょ？！この猫マジ天使なんだから...！(目キラキラ)',
                condition: 'correct'
            },
            {
                speaker: 'girl3',
                text: '귀엽다는 건 "かわいい"야... 이 고양이한테 써.',
                textJp: '可愛いは「かわいい」だよ...この猫に使って。',
                condition: 'wrong'
            },

            // 마무리
            {
                speaker: 'girl3',
                text: '...하아, 휴식 끝이다. 일해야 해.',
                textJp: '...はあ、休憩終わり。仕事しないと。'
            },
            {
                speaker: 'girl3',
                text: '...야. 시간 되면 또 와. 커피 한 잔 줄게.',
                textJp: '...ねえ。時間あったらまた来なよ。コーヒー一杯あげる。'
            },
            {
                speaker: 'girl3',
                text: '...서비스야 서비스. 다른 의미 없거든? (얼굴 붉히며)',
                textJp: '...サービスだよサービス。他の意味ないから？(顔赤くして)'
            },

            // 퀴즈 9: 약속
            {
                speaker: 'quiz',
                question: '히나타가 시선을 피하며 말한다. "또 올게"라고 하려면?',
                options: [
                    'また来るよ',
                    'もう来ない',
                    '来たくない',
                    '知らない'
                ],
                meanings: [
                    '또 올게',
                    '이제 안 와',
                    '오고 싶지 않아',
                    '몰라'
                ],
                correct: 0
            },
            {
                speaker: 'girl3',
                text: '...ㅎ, 훗. 그래, 기다릴... 아니 기다리는 거 아니거든?!',
                textJp: '...っ、ふっ。そう、待って...いや待ってないから？！',
                condition: 'correct'
            },
            {
                speaker: 'girl3',
                text: '..."また来る"가 또 올게야. 빨리 외워, 바보.',
                textJp: '...「また来る」がまた来るって意味。早く覚えろ、バカ。',
                condition: 'wrong'
            },

            // 스테이지 3 엔딩
            {
                speaker: 'girl3',
                text: '...그리고. 한 가지만 더.',
                textJp: '...それと。一つだけ。'
            },
            {
                speaker: 'girl3',
                text: '나... 너 싫지 않아. 오히려... (중얼중얼)',
                textJp: '私...あんたのこと嫌いじゃない。むしろ...(モゴモゴ)'
            },

            // 퀴즈 10: 히나타의 고백
            {
                speaker: 'quiz',
                question: '히나타가 새빨개진 얼굴로 뭔가 중얼거렸다. "좋아해"는 일본어로?',
                options: [
                    '嫌い',
                    '好き',
                    '普通',
                    '知らない'
                ],
                meanings: [
                    '싫어',
                    '좋아해',
                    '보통',
                    '몰라'
                ],
                correct: 1
            },
            {
                speaker: 'girl3',
                text: '~~~?! 안 들렸거든?! 아무것도 안 들었지?! (얼굴 숨기며)',
                textJp: '~~~？！聞こえてないから？！何も聞いてないよね？！(顔隠して)',
                condition: 'correct'
            },
            {
                speaker: 'girl3',
                text: '...다행이다, 몰라. 언젠간... 똑바로 말해줄게.',
                textJp: '...よかった、知らないんだ。いつか...ちゃんと言ってやる。',
                condition: 'wrong'
            },

            {
                speaker: 'girl3',
                text: '...빨리 가, 바보! 가게 폐점이거든!',
                textJp: '...早く行け、バカ！お店閉店だから！'
            },
            {
                speaker: 'narration',
                text: '히나타의 새침한 태도 뒤에 숨은 따뜻함과 부끄러움. 또 오고 싶다.',
                textJp: 'ひなたのツンとした態度の裏に隠れた温かさと恥ずかしさ。また来たい。'
            },
        ]
    },

    // ============================================
    // Stage 4: Final - 고백의 순간
    // ============================================
    stage4: {
        background: bgSchool,
        title: '고백의 순간',
        dialogues: [
            {
                speaker: 'narration',
                text: '교환학생 생활도 어느덧 끝이 보인다...',
                textJp: '交換留学生活もいよいよ終わりが見えてきた...'
            },
            {
                speaker: 'narration',
                text: '한국으로 돌아가기 전, 마지막으로 전하고 싶은 마음이 있다.',
                textJp: '韓国に帰る前、最後に伝えたい気持ちがある。'
            },
            {
                speaker: 'narration',
                text: '세 사람의 얼굴이 떠오른다. 누구에게 마음을 전할까?',
                textJp: '三人の顔が浮かぶ。誰に気持ちを伝えようか？'
            },
            {
                speaker: 'finalChoice',
                question: '누구에게 고백할까?',
                options: ['하나 (はな)', '미사키 (みさき)', '히나타 (ひなた)']
            },
        ]
    }
};

// Endings data
const endings = {
    girl1: {
        girl: 'girl1',
        dialogues: [
            {
                speaker: 'girl1',
                text: '에...?! 나, 나한테 고백하는 거야...?!',
                textJp: 'え...？！わ、私に告白してるの...？！'
            },
            {
                speaker: 'girl1',
                text: '...에헤헤, 사실 나도... 처음부터 너 좋아했어.',
                textJp: '...えへへ、実は私も...最初からあなたのこと好きだった。'
            },
            {
                speaker: 'girl1',
                text: '처음 봤을 때부터 심장이 ドキドキ했거든!',
                textJp: '初めて会った時から心臓がドキドキしてたんだよ！'
            },
            {
                speaker: 'girl1',
                text: '한국 돌아가도 절대 잊으면 안 돼! 매일 연락해!',
                textJp: '韓国帰っても絶対忘れちゃダメだよ！毎日連絡して！'
            },
            {
                speaker: 'girl1',
                text: '나 한국어 열심히 배울게! 그래서 꼭 만나러 갈 거야!',
                textJp: '私、韓国語頑張って勉強する！それで絶対会いに行くから！'
            },
            {
                speaker: 'girl1',
                text: '우리... 계속 함께하자! 약속이야, 약속~!',
                textJp: '私たち...ずっと一緒にいよう！約束だよ、約束～！'
            },
            {
                speaker: 'ending',
                text: '🌸 HANA ENDING 🌸',
                subtitle: '하나와 함께하는 화사한 날들 - 桜色の約束'
            },
        ]
    },
    girl2: {
        girl: 'girl2',
        dialogues: [
            {
                speaker: 'girl2',
                text: '...그런 말을, 저에게 해주시는 거예요...?',
                textJp: '...そんなことを、私に言ってくれるんですか...？'
            },
            {
                speaker: 'girl2',
                text: '...사실, 저도 같은 마음이었어요.',
                textJp: '...実は、私も同じ気持ちでした。'
            },
            {
                speaker: 'girl2',
                text: '처음 서점에서 만났을 때부터... 特別했어요, 당신은.',
                textJp: '初めて本屋で会った時から...特別でした、あなたは。'
            },
            {
                speaker: 'girl2',
                text: '멀리 떨어져 있어도... 이 마음은 변하지 않을 거예요.',
                textJp: '遠く離れていても...この気持ちは変わらないと思います。'
            },
            {
                speaker: 'girl2',
                text: '기다리고 있을게요. 언제까지든... 꼭 돌아와 주세요.',
                textJp: '待っています。いつまでも...必ず戻ってきてください。'
            },
            {
                speaker: 'girl2',
                text: '...好きです. 당신을, 정말로.',
                textJp: '...好きです。あなたを、本当に。'
            },
            {
                speaker: 'ending',
                text: '📚 MISAKI ENDING 📚',
                subtitle: '미사키와 함께하는 고요한 날들 - 静かな誓い'
            },
        ]
    },
    girl3: {
        girl: 'girl3',
        dialogues: [
            {
                speaker: 'girl3',
                text: '...하? 뭐라고? 지금 나한테 고백하는 거야?',
                textJp: '...は？何？今私に告白してんの？'
            },
            {
                speaker: 'girl3',
                text: '...바, 바보잖아. 갑자기 그런 말 하면... (얼굴 새빨개짐)',
                textJp: '...バ、バカじゃん。急にそんなこと言われたら...(顔真っ赤)'
            },
            {
                speaker: 'girl3',
                text: '심장 터지겠어... 책임져, 진짜로.',
                textJp: '心臓破裂しそう...責任取れよ、マジで。'
            },
            {
                speaker: 'girl3',
                text: '...나도. 처음부터 신경 쓰였어. 싫지 않았고.',
                textJp: '...私も。最初から気になってた。嫌いじゃなかったし。'
            },
            {
                speaker: 'girl3',
                text: '빨리 돌아와. 기다리는 거 싫거든. ...근데 기다릴게.',
                textJp: '早く帰ってこい。待つの嫌いだから。...でも待つ。'
            },
            {
                speaker: 'girl3',
                text: '...好き. 알았지, 바보. (등 돌리며)',
                textJp: '...好き。分かったでしょ、バカ。(背を向けて)'
            },
            {
                speaker: 'ending',
                text: '☕ HINATA ENDING ☕',
                subtitle: '히나타와 함께하는 따뜻한 날들 - ツンデレの告白'
            },
        ]
    }
};

// Sad Endings (rejection based on low affection)
const sadEndings = {
    girl1: {
        girl: 'girl1',
        dialogues: [
            {
                speaker: 'girl1',
                text: '에...? 고, 고백...?',
                textJp: 'え...？こ、告白...？'
            },
            {
                speaker: 'girl1',
                text: '...미안해. 솔직히 말할게.',
                textJp: '...ごめんね。正直に言うね。'
            },
            {
                speaker: 'girl1',
                text: '나... 아직 너를 그렇게 생각해본 적이 없어.',
                textJp: '私...まだあなたのことをそういう風に考えたことがないの。'
            },
            {
                speaker: 'girl1',
                text: '우리 더 많이 알아가는 게 먼저 아닐까?',
                textJp: '私たち、もっとお互いを知ることが先じゃないかな？'
            },
            {
                speaker: 'girl1',
                text: '...친구로서는 좋아해. 정말이야.',
                textJp: '...友達としては好きだよ。本当だよ。'
            },
            {
                speaker: 'ending',
                text: '💔 BAD ENDING 💔',
                subtitle: '아직 때가 아니었던 것 같아... - まだ早すぎた',
                isSad: true
            },
        ]
    },
    girl2: {
        girl: 'girl2',
        dialogues: [
            {
                speaker: 'girl2',
                text: '...그런 말씀을 해주시다니.',
                textJp: '...そんなことをおっしゃるなんて。'
            },
            {
                speaker: 'girl2',
                text: '정말 죄송해요. 저는...',
                textJp: '本当に申し訳ありません。私は...'
            },
            {
                speaker: 'girl2',
                text: '아직 당신을 잘 모르는 것 같아요.',
                textJp: 'まだあなたのことをよく知らないと思います。'
            },
            {
                speaker: 'girl2',
                text: '마음을 전해주셔서 감사해요. 하지만...',
                textJp: '気持ちを伝えてくださってありがとうございます。でも...'
            },
            {
                speaker: 'girl2',
                text: '지금은 받아들일 수 없어요. 죄송해요.',
                textJp: '今は受け入れることができません。ごめんなさい。'
            },
            {
                speaker: 'ending',
                text: '💔 BAD ENDING 💔',
                subtitle: '마음이 닿지 않았어... - 届かなかった想い',
                isSad: true
            },
        ]
    },
    girl3: {
        girl: 'girl3',
        dialogues: [
            {
                speaker: 'girl3',
                text: '...하? 뭐야 갑자기.',
                textJp: '...は？何いきなり。'
            },
            {
                speaker: 'girl3',
                text: '...솔직히 말할게. 별로 관심 없었어.',
                textJp: '...正直に言うね。あんまり興味なかったし。'
            },
            {
                speaker: 'girl3',
                text: '나한테 뭘 해준 것도 없잖아.',
                textJp: '私に何してくれたわけでもないじゃん。'
            },
            {
                speaker: 'girl3',
                text: '...미안. 그냥 친구로 지내자.',
                textJp: '...ごめん。ただの友達でいよう。'
            },
            {
                speaker: 'girl3',
                text: '다음에 더 노력해. ...바보.',
                textJp: '次はもっと頑張れ。...バカ。'
            },
            {
                speaker: 'ending',
                text: '💔 BAD ENDING 💔',
                subtitle: '마음을 열지 못했어... - 開かなかった心',
                isSad: true
            },
        ]
    }
};

export { storyData, endings, sadEndings };

// Main App Component
export default function KoibenApp() {
    const [currentScreen, setCurrentScreen] = useState('title');
    const [currentStage, setCurrentStage] = useState(0); // Start with prologue (stage 0)
    const [unlockedStage, setUnlockedStage] = useState(0); // Prologue is unlocked by default
    const [affection, setAffection] = useState({ girl1: 0, girl2: 0, girl3: 0 });
    const [learnedWords, setLearnedWords] = useState([]);
    const [wrongWords, setWrongWords] = useState([]);
    const [energy, setEnergy] = useState(5);
    const [playerName, setPlayerName] = useState('');

    const [selectedEnding, setSelectedEnding] = useState(null);
    const [completedEnding, setCompletedEnding] = useState(null); // Track which ending player has completed
    const [showPremium, setShowPremium] = useState(false);

    const handleStart = () => {
        if (!playerName) {
            setCurrentScreen('nameInput');
        } else {
            setCurrentScreen('main');
        }
    };

    const handleNameSubmit = (name) => {
        setPlayerName(name);
        setCurrentScreen('main');
    };

    const handleStageComplete = (newAffection) => {
        setAffection(prev => ({
            girl1: prev.girl1 + (newAffection.girl1 || 0),
            girl2: prev.girl2 + (newAffection.girl2 || 0),
            girl3: prev.girl3 + (newAffection.girl3 || 0),
        }));

        if (currentStage < 4) {
            const nextStage = currentStage + 1;
            setCurrentStage(nextStage);
            // Unlock next stage
            setUnlockedStage(prev => Math.max(prev, nextStage));
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 overflow-hidden font-sans">
            {currentScreen === 'title' && (
                <TitleScreen onStart={handleStart} />
            )}

            {currentScreen === 'nameInput' && (
                <NameInputScreen onConfirm={handleNameSubmit} />
            )}

            {currentScreen === 'main' && (
                <MainMenu
                    affection={affection}
                    energy={energy}
                    learnedWords={learnedWords.length}
                    currentStage={currentStage}
                    onNavigate={setCurrentScreen}
                />
            )}

            {currentScreen === 'story' && (
                <StoryMode
                    currentStage={currentStage}
                    affection={affection}
                    setAffection={setAffection}
                    onStageComplete={handleStageComplete}
                    setLearnedWords={setLearnedWords}
                    onBack={() => setCurrentScreen('main')}
                    selectedEnding={selectedEnding}
                    setSelectedEnding={setSelectedEnding}
                    completedEnding={completedEnding}
                    setCompletedEnding={setCompletedEnding}
                    setShowPremium={setShowPremium}
                    playerName={playerName}
                />
            )}

            {currentScreen === 'stageSelect' && (
                <StageSelect
                    unlockedStage={unlockedStage}
                    onSelectStage={(stage) => {
                        setCurrentStage(stage);
                        setCurrentScreen('story');
                    }}
                    onBack={() => setCurrentScreen('main')}
                />
            )}

            {currentScreen === 'training' && (
                <TrainingMode
                    learnedWords={learnedWords}
                    setLearnedWords={setLearnedWords}
                    wrongWords={wrongWords}
                    setWrongWords={setWrongWords}
                    energy={energy}
                    setEnergy={setEnergy}
                    onBack={() => setCurrentScreen('main')}
                    setShowPremium={setShowPremium}
                />
            )}

            {currentScreen === 'dictionary' && (
                <Dictionary
                    learnedWords={learnedWords}
                    wrongWords={wrongWords}
                    setWrongWords={setWrongWords}
                    onBack={() => setCurrentScreen('main')}
                />
            )}

            {currentScreen === 'store' && (
                <Store
                    onBack={() => setCurrentScreen('main')}
                />
            )}

            {currentScreen === 'ranking' && (
                <Ranking
                    playerName={playerName}
                    affection={affection}
                    onBack={() => setCurrentScreen('main')}
                />
            )}

            {/* Premium Popup - Global */}
            {showPremium && (
                <PremiumPopup onClose={() => setShowPremium(false)} />
            )}
        </div>
    );
}

// Stage Select Screen
function StageSelect({ unlockedStage, onSelectStage, onBack }) {
    const stages = [
        { id: 0, title: '프롤로그', girl: null, color: 'sky', desc: '운명의 교환학생 - 일본 도착' },
        { id: 1, title: '하나 - 학교', girl: 'girl1', color: 'pink', desc: '귀여운 여사친과의 첫 만남' },
        { id: 2, title: '미사키 - 마을', girl: 'girl2', color: 'purple', desc: '지적인 소녀와의 조우' },
        { id: 3, title: '히나타 - 카페', girl: 'girl3', color: 'amber', desc: '새침한 알바생과의 만남' },
        { id: 4, title: '고백의 순간', girl: null, color: 'rose', desc: '마지막 선택의 시간' },
    ];

    return (
        <div className="h-screen relative overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${bgSchool})` }}
            >
                <div className="absolute inset-0 bg-slate-900/80" />
            </div>

            <div className="relative z-10 h-full flex flex-col p-3">
                <button onClick={onBack} className="flex items-center gap-1 text-gray-400 hover:text-white mb-3 text-xs">
                    <ArrowLeft className="w-4 h-4" /> 돌아가기
                </button>

                <div className="flex-1 flex flex-col justify-center">
                    <div className="text-center mb-4">
                        <BookOpen className="w-6 h-6 text-pink-400 mx-auto mb-1" />
                        <h1 className="text-lg font-bold text-white mb-0.5">스테이지 선택</h1>
                        <p className="text-gray-400 text-xs">플레이할 스테이지를 선택하세요</p>
                    </div>

                    <div className="flex flex-col gap-2 max-w-sm mx-auto w-full">
                        {stages.map((stage) => {
                            const isLocked = stage.id > unlockedStage;
                            const colorClasses = {
                                sky: 'border-sky-400/50 hover:bg-sky-500/20',
                                pink: 'border-pink-400/50 hover:bg-pink-500/20',
                                purple: 'border-purple-400/50 hover:bg-purple-500/20',
                                amber: 'border-amber-400/50 hover:bg-amber-500/20',
                                rose: 'border-rose-400/50 hover:bg-rose-500/20',
                            };
                            const lockedClass = 'border-gray-600/50 cursor-not-allowed opacity-50';
                            return (
                                <button
                                    key={stage.id}
                                    onClick={() => !isLocked && onSelectStage(stage.id)}
                                    disabled={isLocked}
                                    className={`p-2 rounded-lg bg-slate-800/80 backdrop-blur border transition-all ${isLocked ? lockedClass : colorClasses[stage.color]}`}
                                >
                                    <div className="flex items-center gap-3">
                                        {isLocked ? (
                                            <div className="w-8 h-10 rounded-md border border-gray-600/50 bg-slate-700/50 flex items-center justify-center">
                                                <Save className="w-4 h-4 text-gray-500" />
                                            </div>
                                        ) : stage.girl ? (
                                            <img
                                                src={characters[stage.girl].image}
                                                alt={stage.title}
                                                className="w-8 h-10 object-cover rounded-md border border-white/20"
                                            />
                                        ) : (
                                            <div className="w-8 h-10 rounded-md border border-white/20 bg-gradient-to-br from-pink-500/30 to-purple-500/30 flex items-center justify-center">
                                                <Heart className="w-4 h-4 text-pink-400" />
                                            </div>
                                        )}
                                        <div className="flex-1 text-left">
                                            <div className="text-xs text-gray-400">Stage {stage.id}</div>
                                            <div className={`text-sm font-bold ${isLocked ? 'text-gray-500' : 'text-white'}`}>
                                                {isLocked ? '🔒 ' : ''}{stage.title}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

function NameInputScreen({ onConfirm }) {
    const [inputName, setInputName] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);

    const handleSubmit = () => {
        if (!inputName.trim()) return;
        setIsAnimating(true);
        setTimeout(() => {
            onConfirm(inputName);
        }, 800);
    };

    return (
        <div className={`w-full h-screen relative flex flex-col items-center justify-center overflow-hidden transition-opacity duration-1000 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            {/* Background */}
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bgSchool})` }} />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            <div className="relative z-10 w-full max-w-md p-8 flex flex-col items-center">
                <h2 className="w-full text-lg font-bold text-white mb-8 text-center">
                    당신의 이름을 알려주세요
                </h2>

                <div className="w-full relative group mb-8">
                    <input
                        type="text"
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                        placeholder="이름 입력"
                        maxLength={8}
                        className="w-full bg-transparent border-b-2 border-white/30 py-3 text-center text-2xl text-white placeholder-white/30 focus:outline-none focus:border-pink-500 transition-colors"
                        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                    />
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={!inputName.trim()}
                    className={`px-10 py-3 rounded-full font-bold transition-all duration-300 ${inputName.trim()
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/30 hover:scale-105'
                        : 'bg-white/10 text-white/30 cursor-not-allowed'
                        }`}
                >
                    시작하기
                </button>
            </div>
        </div>
    );
}

// Title Screen
function TitleScreen({ onStart }) {
    const [showStart, setShowStart] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowStart(true), 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="h-screen relative flex flex-col items-center justify-center">
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${bgFirstPage})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6">
                {/* Characters preview */}
                <div className="flex justify-center gap-2 mb-6" style={{ animation: 'fadeIn 1s ease-out' }}>
                    <img src={girl1Img} alt="Girl 1" className="w-16 h-20 object-cover rounded-xl shadow-xl border-2 border-pink-400/50" />
                    <img src={girl3Img} alt="Girl 3" className="w-16 h-20 object-cover rounded-xl shadow-xl border-2 border-amber-400/50" />
                    <img src={boyImg} alt="Boy" className="w-20 h-24 object-cover rounded-xl shadow-xl border-2 border-blue-400/50" />
                    <img src={girl2Img} alt="Girl 2" className="w-16 h-20 object-cover rounded-xl shadow-xl border-2 border-purple-400/50" />
                </div>

                {/* Title */}
                <div style={{ animation: 'fadeIn 1s ease-out 0.3s both' }}>
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
                        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400">
                            恋勉
                        </h1>
                        <Heart className="w-6 h-6 text-purple-400 fill-purple-400" />
                    </div>
                    <h2 className="text-xl text-pink-300/80 tracking-widest mb-2">KOIBEN</h2>
                    <p className="text-gray-400 text-sm">일본어 학습 연애 시뮬레이션</p>
                </div>

                {/* Start Button */}
                {showStart && (
                    <button
                        onClick={onStart}
                        className="mt-8 group relative px-12 py-3 overflow-hidden rounded-full"
                        style={{ animation: 'fadeIn 0.8s ease-out' }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500" />
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-px bg-slate-900/80 rounded-full group-hover:bg-slate-900/60 transition-colors" />
                        <span className="relative flex items-center gap-2 text-base text-white font-medium">
                            <Play className="w-5 h-5 fill-current" />
                            게임 시작
                        </span>
                    </button>
                )}
            </div>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}

// Main Menu
function MainMenu({ affection, energy, learnedWords, currentStage, onNavigate }) {
    return (
        <div className="min-h-screen relative">
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${bgSchool})` }}
            >
                <div className="absolute inset-0 bg-slate-900/70" />
            </div>

            <div className="relative z-10 h-screen flex flex-col p-3 overflow-hidden">
                {/* Header Stats */}
                <div className="flex flex-wrap justify-center gap-2 mb-3 mt-12">
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-pink-500/20 border border-pink-400/30">
                        <Heart className="w-3 h-3 text-pink-400" />
                        <span className="text-pink-400 text-xs font-medium">{characters.girl1.name}: {affection.girl1}%</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-purple-500/20 border border-purple-400/30">
                        <Heart className="w-3 h-3 text-purple-400" />
                        <span className="text-purple-400 text-xs font-medium">{characters.girl2.name}: {affection.girl2}%</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/20 border border-amber-400/30">
                        <Heart className="w-3 h-3 text-amber-400" />
                        <span className="text-amber-400 text-xs font-medium">{characters.girl3.name}: {affection.girl3}%</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30">
                        <Zap className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 text-xs font-medium">{energy}/5</span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col items-center justify-center">
                    {/* Character Display - Boy only (1/3 of screen) */}
                    <div className="flex items-center justify-center mb-2">
                        <div className="text-center">
                            <img src={boyImg} alt="You" className="h-[270px] w-auto object-contain rounded-xl shadow-xl border-2 border-blue-400/50" />
                        </div>
                    </div>

                    {/* Stage indicator */}
                    <div className="bg-slate-800/80 backdrop-blur rounded-lg px-4 py-2 mb-4 border border-slate-700/50">
                        <div className="flex items-center justify-center gap-3">
                            <span className="text-gray-400 text-xs">현재 스테이지:</span>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4].map(stage => (
                                    <div
                                        key={stage}
                                        className={`w-6 h-2 rounded-full transition-colors ${stage <= currentStage
                                            ? 'bg-gradient-to-r from-pink-500 to-purple-500'
                                            : 'bg-slate-700'
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-white text-sm font-bold">{currentStage}/4</span>
                        </div>
                    </div>

                    {/* Menu Buttons */}
                    <div className="w-full max-w-sm space-y-2">
                        <MenuButton
                            icon={BookOpen}
                            title="스토리 모드"
                            subtitle="스테이지 선택"
                            onClick={() => onNavigate('stageSelect')}
                            highlight
                        />
                        <MenuButton
                            icon={Pencil}
                            title="트레이닝 센터"
                            subtitle="히라가나 & 단어 학습"
                            onClick={() => onNavigate('training')}
                        />
                        <MenuButton
                            icon={BookMarked}
                            title="단어장"
                            subtitle={`${learnedWords}개 단어 수집`}
                            onClick={() => onNavigate('dictionary')}
                        />
                        <MenuButton
                            icon={ShoppingBag}
                            title="상점"
                            subtitle="아이템 및 패키지 구매"
                            onClick={() => onNavigate('store')}
                        />
                        <MenuButton
                            icon={Trophy}
                            title="랭킹"
                            subtitle="전체 플레이어 순위"
                            onClick={() => onNavigate('ranking')}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function MenuButton({ icon: Icon, title, subtitle, onClick, highlight }) {
    return (
        <button
            onClick={onClick}
            className={`group w-full relative overflow-hidden rounded-xl transition-all hover:scale-102 ${highlight ? 'ring-2 ring-pink-400/50' : ''
                }`}
        >
            <div className="absolute inset-0 bg-slate-800/80 backdrop-blur" />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 to-purple-500/0 group-hover:from-pink-500/20 group-hover:to-purple-500/20 transition-all" />
            <div className="relative flex items-center gap-3 p-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${highlight
                    ? 'bg-gradient-to-br from-pink-500/30 to-purple-500/30 border-pink-400/30'
                    : 'bg-slate-700/50 border-slate-600/50'
                    }`}>
                    <Icon className={`w-5 h-5 ${highlight ? 'text-pink-400' : 'text-gray-400'}`} />
                </div>
                <div className="text-left flex-1">
                    <div className="text-sm font-bold text-white">{title}</div>
                    <div className="text-xs text-gray-400">{subtitle}</div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-pink-400 transition-colors" />
            </div>
        </button>
    );
}

// Story Mode
function StoryMode({ currentStage, affection, setAffection, onStageComplete, setLearnedWords, onBack, selectedEnding, setSelectedEnding, setShowPremium, playerName }) {
    const [dialogueIndex, setDialogueIndex] = useState(0);
    const [quizAnswer, setQuizAnswer] = useState(null);
    const [textRevealed, setTextRevealed] = useState(false);
    const [inEnding, setInEnding] = useState(false);
    const [isSadEnding, setIsSadEnding] = useState(false);
    const [autoPlay, setAutoPlay] = useState(false);
    const [stageAffection, setStageAffection] = useState({ girl1: 0, girl2: 0, girl3: 0 });

    const stageKey = `stage${currentStage}`;
    const stage = storyData[stageKey];

    // Choose ending dialogues based on happy/sad ending
    const currentDialogues = inEnding && selectedEnding
        ? (isSadEnding ? sadEndings[selectedEnding].dialogues : endings[selectedEnding].dialogues)
        : stage?.dialogues || [];
    const currentDialogue = currentDialogues[dialogueIndex];

    // Process text with player name
    // Process text with player name
    const processedText = currentDialogue && currentDialogue.text ? currentDialogue.text.replace(/당신/g, playerName ? `${playerName}님` : '당신') : '';
    const processedTextJp = currentDialogue && currentDialogue.textJp ? currentDialogue.textJp.replace(/あなた/g, playerName ? `${playerName}さんと` : 'あなた') : '';

    const currentGirl = inEnding && selectedEnding
        ? selectedEnding
        : stage?.girl;

    // Track if ranking has been submitted for this ending
    const [hasSubmittedRanking, setHasSubmittedRanking] = useState(false);

    // Auto-submit ranking when ending screen is shown
    useEffect(() => {
        const submitRanking = async () => {
            if (currentDialogue?.speaker === 'ending' && playerName && !hasSubmittedRanking) {
                try {
                    const totalScore = affection.girl1 + affection.girl2 + affection.girl3;
                    await addDoc(collection(db, 'rankings'), {
                        name: playerName,
                        score: totalScore,
                        girl1: affection.girl1,
                        girl2: affection.girl2,
                        girl3: affection.girl3,
                        selectedEnding: selectedEnding,
                        isSadEnding: isSadEnding,
                        timestamp: serverTimestamp()
                    });
                    setHasSubmittedRanking(true);
                    console.log('Ranking submitted successfully!');
                } catch (error) {
                    console.error('Error submitting ranking:', error);
                }
            }
        };
        submitRanking();
    }, [currentDialogue, playerName, hasSubmittedRanking, affection, selectedEnding, isSadEnding]);

    useEffect(() => {
        setTextRevealed(false);
        const timer = setTimeout(() => setTextRevealed(true), 50);
        return () => clearTimeout(timer);
    }, [dialogueIndex, inEnding]);

    const handleNext = () => {
        if (dialogueIndex < currentDialogues.length - 1) {
            let nextIndex = dialogueIndex + 1;
            const nextDialogue = currentDialogues[nextIndex];

            if (nextDialogue?.condition) {
                if (quizAnswer === 'correct' && nextDialogue.condition === 'wrong') nextIndex++;
                else if (quizAnswer === 'wrong' && nextDialogue.condition === 'correct') nextIndex++;
            }

            setDialogueIndex(nextIndex);
            setQuizAnswer(null);
        } else if (!inEnding && currentStage === 3 && selectedEnding) {
            // Move to ending
            setInEnding(true);
            setDialogueIndex(0);
        } else if (inEnding) {
            // Game complete
            onBack();
        } else {
            // Stage complete
            onStageComplete(stageAffection);
            onBack();
        }
    };

    const handleQuizAnswer = (index) => {
        const isCorrect = index === currentDialogue.correct;
        setQuizAnswer(isCorrect ? 'correct' : 'wrong');

        if (currentGirl) {
            setStageAffection(prev => ({
                ...prev,
                [currentGirl]: Math.max(0, (prev[currentGirl] || 0) + (isCorrect ? 10 : -10))
            }));
        }

        // Removed setTimeout to allow manual progression
    };

    const handleChoice = (index) => {
        const change = currentDialogue.affectionChanges[index];
        if (currentGirl && change) {
            setStageAffection(prev => ({
                ...prev,
                [currentGirl]: (prev[currentGirl] || 0) + change
            }));
        }
        handleNext();
    };

    const handleFinalChoice = (index) => {
        const choices = ['girl1', 'girl2', 'girl3'];
        const chosenGirl = choices[index];

        // If player already completed an ending, force that ending
        const finalGirl = completedEnding || chosenGirl;
        const girlAffection = affection[finalGirl] || 0;

        // Affection-based ending determination
        // 80%+ = guaranteed happy ending
        // Below 30% = guaranteed sad ending
        // 30-80% = probability based on affection
        let isHappyEnding = true;

        if (girlAffection >= 80) {
            isHappyEnding = true;
        } else if (girlAffection < 30) {
            isHappyEnding = false;
        } else {
            // 30-80%: Calculate probability
            const probability = (girlAffection - 30) / 50;
            isHappyEnding = Math.random() < probability;
        }

        setSelectedEnding(finalGirl);
        setIsSadEnding(!isHappyEnding);
        setInEnding(true);
        setDialogueIndex(0);

        // Mark this ending as completed (locks future choices)
        if (!completedEnding) {
            setCompletedEnding(finalGirl);
        }
    };

    if (!currentDialogue) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900">
                <div className="text-center">
                    <Sparkles className="w-16 h-16 text-pink-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-4">스테이지 완료!</h2>
                    <button onClick={onBack} className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full">
                        메인으로 돌아가기
                    </button>
                </div>
            </div>
        );
    }

    // Title screen (prologue ending)
    if (currentDialogue.speaker === 'title') {
        return (
            <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden animate-[fadeIn_2s_ease-out]">
                {/* Background */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${bgPrologue})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-slate-900/50" />
                </div>

                {/* Cherry blossom effect overlay */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-10 left-10 w-2 h-2 bg-pink-300 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="absolute top-20 right-20 w-1.5 h-1.5 bg-pink-200 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '0.5s' }} />
                    <div className="absolute top-40 left-1/3 w-1.5 h-1.5 bg-pink-300 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '0.8s' }} />
                    <div className="absolute top-32 right-1/4 w-2 h-2 bg-pink-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s' }} />
                </div>

                {/* Title Content */}
                <div className="relative z-10 text-center px-6" style={{ animation: 'fadeIn 1.5s ease-out' }}>
                    <div className="mb-4">
                        <Sparkles className="w-10 h-10 text-pink-400 mx-auto mb-2 animate-pulse" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-3 drop-shadow-2xl" style={{ animation: 'fadeIn 1s ease-out' }}>
                        {currentDialogue.text}
                    </h1>
                    <p className="text-base text-pink-300/80 mb-8" style={{ animation: 'fadeIn 1.5s ease-out' }}>
                        {currentDialogue.textJp}
                    </p>

                    <button
                        onClick={handleNext}
                        className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-bold rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center gap-2 mx-auto border border-white/30"
                    >
                        <Play className="w-4 h-4" />
                        스토리 시작하기
                    </button>
                </div>
            </div>
        );
    }

    // Ending screen
    if (currentDialogue.speaker === 'ending') {
        // Select ending background based on character and ending type
        const endingBackground = isSadEnding
            ? (selectedEnding === 'girl1' ? bgBadEnding1
                : selectedEnding === 'girl2' ? bgBadEnding2
                    : bgBadEnding3)
            : (selectedEnding === 'girl1' ? bgEnding1
                : selectedEnding === 'girl2' ? bgEnding2
                    : bgEnding3);

        // Colors change based on happy/sad ending
        const endingColor = isSadEnding ? 'gray' : (
            selectedEnding === 'girl1' ? 'pink'
                : selectedEnding === 'girl2' ? 'purple'
                    : 'amber'
        );

        const gradientColors = isSadEnding
            ? 'from-gray-500 to-slate-600'
            : (selectedEnding === 'girl1'
                ? 'from-pink-500 to-rose-500'
                : selectedEnding === 'girl2'
                    ? 'from-purple-500 to-indigo-500'
                    : 'from-amber-500 to-orange-500');

        return (
            <div className="h-screen flex items-center justify-center relative overflow-hidden">
                {/* Background */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${endingBackground})` }}
                >
                    <div className={`absolute inset-0 ${isSadEnding ? 'bg-slate-900/70' : 'bg-gradient-to-t from-slate-900/80 via-transparent to-transparent'}`} />
                </div>

                {/* Ending Card - Bottom Wide Rectangle */}
                <div className="absolute bottom-24 left-0 right-0 px-4 flex justify-center z-20">
                    <div className={`w-full max-w-sm backdrop-blur-lg rounded-2xl p-6 border shadow-2xl ${isSadEnding ? 'bg-slate-800/80 border-gray-500/30' : 'bg-white/20 border-white/30'}`}>
                        <div className="flex flex-col items-center text-center">
                            {/* Icon */}
                            {isSadEnding ? (
                                <Heart className="w-8 h-8 text-gray-400 mb-2" />
                            ) : (
                                <Sparkles className={`w-8 h-8 text-${endingColor}-400 mb-2 animate-pulse`} />
                            )}

                            {/* Title */}
                            <h1 className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${gradientColors} mb-2`}>
                                {currentDialogue.text}
                            </h1>

                            {/* Subtitle */}
                            <p className={`text-sm mb-4 leading-relaxed ${isSadEnding ? 'text-gray-400' : 'text-gray-200'}`}>
                                {currentDialogue.subtitle}
                            </p>

                            {/* Character badge */}
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-4 ${isSadEnding ? 'bg-gray-500/20 border border-gray-400/30' : `bg-${endingColor}-500/20 border border-${endingColor}-400/50`}`}>
                                {isSadEnding ? (
                                    <>
                                        <X className="w-4 h-4 text-gray-400" />
                                        <span className="text-gray-400 text-xs font-medium">다음에는 더 노력해보자...</span>
                                    </>
                                ) : (
                                    <>
                                        <Heart className={`w-4 h-4 text-${endingColor}-400 fill-${endingColor}-400`} />
                                        <span className={`text-${endingColor}-400 text-xs font-medium`}>{characters[selectedEnding].name}와 함께한 추억</span>
                                    </>
                                )}
                            </div>

                            {/* Back button */}
                            <button
                                onClick={onBack}
                                className={`w-full px-6 py-3 bg-gradient-to-r ${gradientColors} text-white rounded-xl text-sm font-bold shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2`}
                            >
                                <Home className="w-4 h-4" /> 메인으로 돌아가기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const bgImage = inEnding && selectedEnding === 'girl2' ? bgVillage : stage?.background;

    return (
        <div className="h-screen flex flex-col relative overflow-hidden">
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
            </div>

            {/* Boy Character - Removed here, moved to Flex container below to align with dialogue box */}

            {/* Girl Character - Removed here, moved to Flex container below */}

            {/* Top Stats */}
            <div className="absolute top-4 left-4 z-30">
                <button onClick={onBack} className="flex items-center gap-1 text-gray-300 hover:text-white bg-slate-800/70 backdrop-blur px-3 py-1.5 rounded-full border border-slate-600/50 transition-all text-xs">
                    <ArrowLeft className="w-3 h-3" /> 돌아가기
                </button>
            </div>
            <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
                {currentGirl && (
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/70 backdrop-blur border ${currentGirl === 'girl1' ? 'border-pink-400/50' : currentGirl === 'girl2' ? 'border-purple-400/50' : 'border-amber-400/50'
                        }`}>
                        <Heart className={`w-4 h-4 ${currentGirl === 'girl1' ? 'text-pink-400 fill-pink-400' : currentGirl === 'girl2' ? 'text-purple-400 fill-purple-400' : 'text-amber-400 fill-amber-400'}`} />
                        <span className={`text-sm font-medium ${currentGirl === 'girl1' ? 'text-pink-400' : currentGirl === 'girl2' ? 'text-purple-400' : 'text-amber-400'}`}>
                            {(affection[currentGirl] || 0) + (stageAffection[currentGirl] || 0)}%
                        </span>
                    </div>
                )}
            </div>

            {/* Characters and Dialogue Flex Container */}
            <div className="absolute bottom-8 left-0 right-0 z-20 flex flex-col justify-end pointer-events-none">

                {/* Characters Container */}
                <div className="flex items-end justify-between px-0 w-full -mb-6 relative z-10">
                    {/* Girl (Left) */}
                    <div className="flex-1 flex justify-start">
                        {currentGirl && currentDialogue.speaker !== 'narration' && currentDialogue.speaker !== 'quiz' &&
                            currentDialogue.speaker !== 'choice' && currentDialogue.speaker !== 'finalChoice' && (
                                <img
                                    src={characters[currentGirl].image}
                                    alt={characters[currentGirl].name}
                                    className="h-[350px] w-auto object-contain filter drop-shadow-2xl transition-all duration-300"
                                />
                            )}
                    </div>

                    {/* Boy (Right) */}
                    <div className="flex-1 flex justify-end">
                        <img
                            src={boyImg}
                            alt="주인공"
                            className="h-[350px] w-auto object-contain filter drop-shadow-2xl transition-all duration-300"
                        />
                    </div>
                </div>

                {/* Dialogue Box */}
                <div className="w-full pb-8 px-3 pointer-events-auto relative z-20">
                    <div className="relative overflow-hidden rounded-2xl shadow-lg border border-white/20">
                        {/* White semi-transparent background */}
                        <div className="absolute inset-0 bg-white/25 backdrop-blur-md" />

                        <div className="relative p-4 min-h-[140px] flex flex-col justify-center">
                            {currentDialogue.speaker !== 'narration' && currentDialogue.speaker !== 'quiz' &&
                                currentDialogue.speaker !== 'choice' && currentDialogue.speaker !== 'finalChoice' && currentGirl && (
                                    <div className="mb-2">
                                        <span className={`inline-block px-3 py-1 rounded-lg text-sm text-white font-bold ${currentGirl === 'girl1' ? 'bg-pink-500/80' : 'bg-purple-500/80'
                                            }`}>
                                            {characters[currentGirl].name}
                                        </span>
                                    </div>
                                )}

                            {/* Quiz */}
                            {currentDialogue.speaker === 'quiz' && (
                                <div>
                                    <div className="text-white text-sm mb-4">{currentDialogue.question}</div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {currentDialogue.options.map((option, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleQuizAnswer(idx)}
                                                disabled={quizAnswer !== null}
                                                className={`p-3 rounded-lg text-sm font-bold transition-all relative overflow-hidden group ${quizAnswer !== null
                                                    ? idx === currentDialogue.correct
                                                        ? 'bg-green-500/80 text-white'
                                                        : 'bg-slate-600/50 text-gray-400'
                                                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                                                    }`}
                                            >
                                                <div className="relative z-10">
                                                    <div>{option}</div>
                                                    {/* Show meaning if answered and meaning exists */}
                                                    {quizAnswer !== null && currentDialogue.meanings && currentDialogue.meanings[idx] && (
                                                        <div className="text-xs font-normal opacity-80 mt-1 pb-1 pt-1 border-t border-white/20">
                                                            {currentDialogue.meanings[idx]}
                                                        </div>
                                                    )}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                    {quizAnswer && (
                                        <div className="mt-3 text-center animate-fadeIn">
                                            <div className={`text-base font-bold mb-2 ${quizAnswer === 'correct' ? 'text-green-400' : 'text-red-400'}`}>
                                                {quizAnswer === 'correct' ? '✓ 정답!' : '✗ 아쉬워요...'}
                                            </div>
                                            <button
                                                onClick={handleNext}
                                                className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white text-sm font-bold rounded-full transition-all border border-white/30 animate-pulse"
                                            >
                                                다음으로 ▶
                                            </button>
                                        </div>
                                    )}

                                    {/* AI Voice Recognition Button */}
                                    {!quizAnswer && (
                                        <div className="mt-6 flex justify-center">
                                            <button
                                                onClick={() => setShowPremium(true)}
                                                className="group relative flex items-center gap-3 px-6 py-3 bg-slate-900/60 backdrop-blur-xl rounded-full border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all hover:scale-105 overflow-hidden"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 animate-pulse" />
                                                <div className="relative z-10 flex items-center gap-2">
                                                    <div className="relative">
                                                        <Mic className="w-5 h-5 text-cyan-400 animate-pulse" />
                                                        <div className="absolute inset-0 bg-cyan-400 blur-sm opacity-50 animate-ping" />
                                                    </div>
                                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-bold text-sm tracking-wide">
                                                        AI 음성 인식
                                                    </span>
                                                </div>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Choice */}
                            {currentDialogue.speaker === 'choice' && (
                                <div>
                                    <div className="text-white text-base mb-4">{currentDialogue.question}</div>
                                    <div className="space-y-2">
                                        {currentDialogue.options.map((option, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleChoice(idx)}
                                                className="w-full p-3 rounded-lg text-sm font-medium bg-white/10 text-white hover:bg-white/20 border border-white/20 transition-all text-left"
                                            >
                                                ▸ {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Final Choice */}
                            {currentDialogue.speaker === 'finalChoice' && (
                                <div>
                                    <div className="text-center mb-4">
                                        <Users className="w-10 h-10 text-pink-400 mx-auto mb-2" />
                                        <div className="text-white text-base">{currentDialogue.question}</div>
                                        {completedEnding && (
                                            <div className="text-xs text-pink-400 mt-2">
                                                💝 이미 {characters[completedEnding].name} 엔딩을 완료했습니다
                                            </div>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        {currentDialogue.options.map((option, idx) => {
                                            const girlKey = ['girl1', 'girl2', 'girl3'][idx];
                                            const isLocked = completedEnding && completedEnding !== girlKey;
                                            const bgColors = ['bg-pink-500/30 hover:bg-pink-500/50 border-pink-400/50 text-pink-300', 'bg-purple-500/30 hover:bg-purple-500/50 border-purple-400/50 text-purple-300', 'bg-amber-500/30 hover:bg-amber-500/50 border-amber-400/50 text-amber-300'];
                                            const lockedStyle = 'bg-gray-700/50 border-gray-600/50 text-gray-500 cursor-not-allowed opacity-50';

                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => !isLocked && handleFinalChoice(idx)}
                                                    disabled={isLocked}
                                                    className={`p-2 rounded-lg text-xs font-bold transition-all text-center border-2 ${isLocked ? lockedStyle : bgColors[idx]}`}
                                                >
                                                    <div className="relative">
                                                        <img
                                                            src={characters[girlKey].image}
                                                            alt={option}
                                                            className={`w-16 h-20 object-cover rounded-lg mx-auto mb-1 border border-white/20 ${isLocked ? 'grayscale' : ''}`}
                                                        />
                                                        {isLocked && (
                                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
                                                                <span className="text-2xl">🔒</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {option}
                                                    {isLocked && <div className="text-[10px] mt-1">잠금됨</div>}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Regular dialogue */}
                            {currentDialogue.speaker !== 'quiz' && currentDialogue.speaker !== 'choice' && currentDialogue.speaker !== 'finalChoice' && (
                                <div onClick={handleNext} className="cursor-pointer">
                                    <p className={`text-white text-sm leading-relaxed mb-2 transition-opacity ${textRevealed ? 'opacity-100' : 'opacity-0'}`}>
                                        {processedText}
                                    </p>
                                    {currentDialogue.textJp && (
                                        <p className={`text-pink-300/70 text-xs transition-opacity ${textRevealed ? 'opacity-100' : 'opacity-0'}`}>
                                            {processedTextJp}
                                        </p>
                                    )}
                                    <div className="absolute bottom-3 right-4 flex items-center gap-0.5 text-pink-300/60 animate-pulse">
                                        <ChevronRight className="w-4 h-4" />
                                        <ChevronRight className="w-4 h-4 -ml-2" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Bottom Menu Removed */}
                </div>
            </div>
        </div>
    );
}

function PremiumPopup({ onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-sm bg-slate-800/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden animate-[scaleIn_0.3s_ease-out]">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 p-2 text-gray-400 hover:text-white transition-colors z-50 bg-slate-700/50 rounded-full hover:bg-slate-600/50"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Sparkling Background Effect */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-gradient-to-br from-pink-500/20 via-transparent to-purple-500/20 animate-spin-slow" />
                    <Sparkles className="absolute top-10 left-10 w-4 h-4 text-yellow-300 opacity-50 animate-pulse" />
                    <Sparkles className="absolute top-20 right-10 w-6 h-6 text-purple-300 opacity-60 animate-pulse delay-75" />
                    <Sparkles className="absolute bottom-10 left-20 w-3 h-3 text-cyan-300 opacity-70 animate-pulse delay-150" />
                </div>

                <div className="relative z-10 flex flex-col items-center p-8 text-center">
                    {/* Header Icon */}
                    <div className="mb-6 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 blur-xl opacity-30" />
                        <div className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full border border-white/20 backdrop-blur-md">
                            <Heart className="w-10 h-10 text-pink-400 fill-pink-400/20 absolute" />
                            <Mic className="w-8 h-8 text-white absolute transform translate-x-2 translate-y-2 drop-shadow-lg" />
                            <Gem className="w-6 h-6 text-cyan-400 absolute top-0 right-0 transform -translate-x-1 translate-y-1 animate-bounce" />
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 mb-2">
                        AI 음성 튜터 &<br />프리미엄 패스 잠금 해제
                    </h2>
                    <p className="text-gray-400 text-sm mb-8">
                        코이벤의 모든 기능을 경험해보세요!
                    </p>

                    {/* Benefits List */}
                    <div className="w-full space-y-4 mb-8 text-left">
                        {[
                            { icon: Mic, text: "AI 실시간 발음 피드백", color: "cyan" },
                            { icon: Heart, text: "음성 대화 시 호감도 보너스", color: "pink" },
                            { icon: Zap, text: "광고 없는 쾌적한 플레이", color: "yellow" },
                            { icon: Shirt, text: "계절 한정 특별 코스튬", color: "purple" }
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                <div className={`p-2 rounded-full bg-${item.color}-500/20 text-${item.color}-400`}>
                                    <item.icon className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-medium text-gray-200">{item.text}</span>
                                <Check className="w-4 h-4 text-green-400 ml-auto" />
                            </div>
                        ))}
                    </div>

                    {/* Subscription Button */}
                    <button className="group w-full relative py-4 rounded-xl overflow-hidden transition-transform hover:scale-105 shadow-lg shadow-purple-500/30">
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient-x" />
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <div className="relative flex flex-col items-center justify-center text-white">
                            <span className="text-lg font-bold">지금 구독하기</span>
                            <span className="text-xs opacity-90">월 9,900원</span>
                        </div>
                    </button>

                    <button onClick={onClose} className="mt-4 text-xs text-gray-500 hover:text-gray-300 transition-colors">
                        구매 복원
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes gradient-x {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-gradient-x {
                    background-size: 200% 200%;
                    animation: gradient-x 3s ease infinite;
                }
            `}</style>
        </div>
    );
}

function MenuBarButton({ icon: Icon, label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded transition-colors ${active ? 'text-pink-400' : 'text-gray-400 hover:text-white'
                }`}
        >
            <Icon className="w-4 h-4" />
            <span className="text-xs tracking-wider">{label}</span>
        </button>
    );
}

// Training Mode  
function TrainingMode({ learnedWords, setLearnedWords, wrongWords, setWrongWords, energy, setEnergy, onBack, setShowPremium }) {
    const [tab, setTab] = useState('select'); // select, hiragana-chart, katakana-chart, quiz
    const [quizType, setQuizType] = useState(null); // hiragana, katakana, vocab-1, vocab-2, vocab-3
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [quiz, setQuiz] = useState([]);

    const generateQuiz = (type) => {
        if (type === 'hiragana') {
            const shuffled = [...hiraganaData].sort(() => Math.random() - 0.5).slice(0, 10);
            return shuffled.map(item => ({
                question: item.char,
                correct: item.romaji,
                options: [item.romaji, ...hiraganaData.filter(h => h.romaji !== item.romaji).sort(() => Math.random() - 0.5).slice(0, 3).map(h => h.romaji)].sort(() => Math.random() - 0.5),
            }));
        } else if (type === 'katakana') {
            const shuffled = [...katakanaData].sort(() => Math.random() - 0.5).slice(0, 10);
            return shuffled.map(item => ({
                question: item.char,
                correct: item.romaji,
                options: [item.romaji, ...katakanaData.filter(k => k.romaji !== item.romaji).sort(() => Math.random() - 0.5).slice(0, 3).map(k => k.romaji)].sort(() => Math.random() - 0.5),
            }));
        } else {
            const stageNum = parseInt(type.split('-')[1]);
            const stageVocab = vocabularyData.filter(v => v.stage === stageNum);
            const shuffled = [...stageVocab].sort(() => Math.random() - 0.5);
            return shuffled.map(item => {
                // Generate shuffled options first
                const distractors = stageVocab.filter(v => v.japanese !== item.japanese).sort(() => Math.random() - 0.5).slice(0, 3);
                const options = [item.japanese, ...distractors.map(v => v.japanese)].sort(() => Math.random() - 0.5);

                // Map options to their meanings for display
                const meanings = options.map(opt => {
                    const vocab = stageVocab.find(v => v.japanese === opt);
                    return vocab ? vocab.meaning : '';
                });

                return {
                    question: item.meaning,
                    correct: item.japanese,
                    options: options,
                    meanings: meanings,
                    vocabData: item
                };
            });
        }
    };

    const startQuiz = (type) => {
        if (energy <= 0) { alert('에너지가 부족합니다!'); return; }
        setQuizType(type);
        setQuiz(generateQuiz(type));
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
        setSelectedAnswer(null);
        setEnergy(prev => prev - 1);
        setTab('quiz');
    };

    const handleAnswer = (answer) => {
        setSelectedAnswer(answer);
        const currentQ = quiz[currentQuestion];
        const isCorrect = answer === currentQ.correct;
        if (isCorrect) {
            setScore(prev => prev + 1);
        } else {
            // Save wrong answer to wrongWords
            if (currentQ.vocabData) {
                setWrongWords(prev => {
                    const exists = prev.some(w => w.japanese === currentQ.vocabData.japanese);
                    if (!exists) {
                        return [...prev, currentQ.vocabData];
                    }
                    return prev;
                });
            }
        }
        setTimeout(() => {
            setSelectedAnswer(null);
            if (currentQuestion < quiz.length - 1) setCurrentQuestion(prev => prev + 1);
            else setShowResult(true);
        }, 1000);
    };

    // Hiragana/Katakana Chart View
    const ChartView = ({ data, title, color }) => (
        <div className="h-screen relative overflow-hidden">
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${bgTraining})` }}
            >
                <div className="absolute inset-0 bg-slate-900/70" />
            </div>

            <div className="relative z-10 h-full flex flex-col p-2">
                <button onClick={() => setTab('select')} className="flex items-center gap-1 text-gray-300 hover:text-white mb-2 bg-white/10 backdrop-blur px-2 py-1 rounded-full border border-white/20 text-xs w-fit">
                    <ArrowLeft className="w-3 h-3" /> 돌아가기
                </button>
                <div className="text-center mb-2">
                    <span className={`text-${color}-400 font-bold text-sm`}>{title}</span>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <div className="grid grid-cols-5 gap-1 max-w-xs mx-auto">
                        {data.map((item, idx) => (
                            <div key={idx} className={`bg-white/10 backdrop-blur rounded-md p-1.5 text-center border border-white/20`}>
                                <div className="text-lg font-bold text-white">{item.char}</div>
                                <div className={`text-xs text-${color}-400`}>{item.romaji}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    // Quiz View
    if (tab === 'quiz') {
        if (showResult) {
            const resultColor = quizType === 'hiragana' ? 'pink' : quizType === 'katakana' ? 'purple' : 'amber';
            const resultGradient = quizType === 'hiragana' ? 'from-pink-500 to-rose-500'
                : quizType === 'katakana' ? 'from-purple-500 to-indigo-500'
                    : 'from-amber-500 to-orange-500';
            const percentScore = Math.round((score / quiz.length) * 100);

            return (
                <div className="h-screen relative overflow-hidden">
                    {/* Background */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${bgTraining})` }}
                    >
                        <div className="absolute inset-0 bg-slate-900/70" />
                    </div>

                    <div className="relative z-10 h-full flex items-center justify-center p-4">
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center max-w-sm w-full border border-white/20 shadow-2xl">
                            {/* Score Icon */}
                            {percentScore >= 80 ? (
                                <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                            ) : percentScore >= 50 ? (
                                <Star className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                            ) : (
                                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            )}

                            <h2 className="text-xl font-bold text-white mb-2">퀴즈 완료!</h2>
                            <div className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${resultGradient} mb-2`}>
                                {score}/{quiz.length}
                            </div>
                            <p className="text-gray-400 text-sm mb-6 flex items-center justify-center gap-2">
                                {percentScore >= 80 ? (
                                    <><Trophy className="w-4 h-4 text-yellow-400" /> 훌륭해요!</>
                                ) : percentScore >= 50 ? (
                                    <><ThumbsUp className="w-4 h-4 text-green-400" /> 잘했어요!</>
                                ) : (
                                    <><Star className="w-4 h-4 text-gray-400" /> 다시 도전해봐요!</>
                                )}
                            </p>

                            <div className="space-y-2">
                                <button
                                    onClick={() => startQuiz(quizType)}
                                    className={`w-full py-2.5 bg-gradient-to-r ${resultGradient} text-white text-sm rounded-full font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2`}
                                >
                                    <RefreshCw className="w-4 h-4" /> 다시 도전
                                </button>
                                <button
                                    onClick={() => setTab('select')}
                                    className="w-full py-2.5 bg-white/10 backdrop-blur text-gray-300 text-sm rounded-full border border-white/20 hover:bg-white/20 transition-all"
                                >
                                    ← 돌아가기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        const currentQ = quiz[currentQuestion];
        const quizColor = quizType === 'hiragana' ? 'pink' : quizType === 'katakana' ? 'purple' : 'amber';

        return (
            <div className="min-h-screen relative">
                {/* Background */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${bgTraining})` }}
                >
                    <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" />
                </div>

                <div className="relative z-10 min-h-screen p-6 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <button onClick={() => setTab('select')} className="flex items-center gap-2 text-gray-300 hover:text-white bg-white/10 backdrop-blur px-4 py-2 rounded-full border border-white/20">
                            <ArrowLeft className="w-4 h-4" /> 그만두기
                        </button>
                        <div className="flex items-center gap-4">
                            <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-full border border-white/20">
                                <span className="text-gray-300 text-sm">Q. {currentQuestion + 1} / {quiz.length}</span>
                            </div>
                            <div className={`bg-${quizColor}-500/20 backdrop-blur px-4 py-2 rounded-full border border-${quizColor}-400/30`}>
                                <Star className={`w-4 h-4 inline mr-1 text-${quizColor}-400`} />
                                <span className={`text-${quizColor}-400 text-sm font-medium`}>{score}점</span>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="w-full h-2 bg-white/10 backdrop-blur rounded-full overflow-hidden border border-white/10">
                            <div
                                className={`h-full bg-gradient-to-r from-${quizColor}-500 to-${quizColor}-400 transition-all duration-500`}
                                style={{ width: `${((currentQuestion + 1) / quiz.length) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Question Card */}
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center mb-8 border border-white/20 shadow-2xl max-w-lg w-full">
                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-${quizColor}-500/20 border border-${quizColor}-400/30 mb-4`}>
                                <BookOpen className={`w-4 h-4 text-${quizColor}-400`} />
                                <span className={`text-${quizColor}-400 text-sm`}>
                                    {quizType?.includes('vocab') ? '단어 퀴즈' : quizType === 'hiragana' ? '히라가나 퀴즈' : '가타카나 퀴즈'}
                                </span>
                            </div>
                            <p className="text-gray-400 mb-4 text-lg">{quizType?.includes('vocab') ? '이 뜻의 일본어는?' : '이 글자의 발음은?'}</p>
                            <div className="text-5xl font-bold text-white py-4">{currentQ?.question}</div>
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-2 gap-2 max-w-sm w-full">
                            {currentQ?.options.map((option, idx) => {
                                const isCorrect = option === currentQ.correct;
                                const isSelected = selectedAnswer === option;
                                const showResult = selectedAnswer !== null;

                                let buttonClass = 'bg-white/10 backdrop-blur border-2 border-white/20 text-white hover:bg-white/20 hover:border-white/40';
                                if (showResult) {
                                    if (isCorrect) {
                                        buttonClass = 'bg-green-500/30 border-2 border-green-400 text-green-400';
                                    } else if (isSelected) {
                                        buttonClass = 'bg-red-500/30 border-2 border-red-400 text-red-400';
                                    } else {
                                        buttonClass = 'bg-white/5 border-2 border-white/10 text-gray-500';
                                    }
                                }

                                return (
                                    <button
                                        key={idx}
                                        onClick={() => handleAnswer(option)}
                                        disabled={selectedAnswer !== null}
                                        className={`p-3 rounded-xl text-base font-bold transition-all transform hover:scale-105 ${buttonClass} relative overflow-hidden group`}
                                    >
                                        <div className="relative z-10">
                                            {showResult && isCorrect && <span className="mr-1">✓</span>}
                                            {showResult && isSelected && !isCorrect && <span className="mr-1">✗</span>}
                                            {option}
                                            {/* Show meaning if answered and meaning exists */}
                                            {showResult && currentQ.meanings && currentQ.meanings[idx] && (
                                                <div className="text-xs font-normal opacity-80 mt-1 pb-1 pt-1 border-t border-white/20">
                                                    {currentQ.meanings[idx]}
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* AI Voice Recognition Button */}
                        {!selectedAnswer && (
                            <div className="mt-6 flex justify-center w-full">
                                <button
                                    onClick={() => setShowPremium(true)}
                                    className="group relative flex items-center gap-3 px-6 py-3 bg-slate-900/60 backdrop-blur-xl rounded-full border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all hover:scale-105 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 animate-pulse" />
                                    <div className="relative z-10 flex items-center gap-2">
                                        <div className="relative">
                                            <Mic className="w-5 h-5 text-cyan-400 animate-pulse" />
                                            <div className="absolute inset-0 bg-cyan-400 blur-sm opacity-50 animate-ping" />
                                        </div>
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-bold text-sm tracking-wide">
                                            AI 음성 인식
                                        </span>
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    if (tab === 'hiragana-chart') return <ChartView data={hiraganaData} title="히라가나 표" color="pink" />;
    if (tab === 'katakana-chart') return <ChartView data={katakanaData} title="가타카나 표" color="purple" />;

    // Pronunciation Practice View
    if (tab === 'pronunciation') {
        const practiceWords = [
            { japanese: 'おはよう', romaji: 'ohayou', meaning: '좋은 아침' },
            { japanese: 'こんにちは', romaji: 'konnichiwa', meaning: '안녕하세요' },
            { japanese: 'ありがとう', romaji: 'arigatou', meaning: '고마워요' },
            { japanese: 'すみません', romaji: 'sumimasen', meaning: '실례합니다' },
            { japanese: 'おねがいします', romaji: 'onegaishimasu', meaning: '부탁합니다' },
            { japanese: 'だいすき', romaji: 'daisuki', meaning: '너무 좋아' },
            { japanese: 'かわいい', romaji: 'kawaii', meaning: '귀여워' },
            { japanese: 'すごい', romaji: 'sugoi', meaning: '대단해' },
        ];

        const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
        const [isListening, setIsListening] = React.useState(false);
        const [userSpeech, setUserSpeech] = React.useState('');
        const [feedback, setFeedback] = React.useState(null);
        const [matchScore, setMatchScore] = React.useState(null);

        const currentWord = practiceWords[currentWordIndex];

        const startListening = () => {
            if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
                setFeedback({ type: 'error', message: '이 브라우저는 음성인식을 지원하지 않습니다. Chrome을 사용해주세요.' });
                return;
            }

            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();

            recognition.lang = 'ja-JP';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            setIsListening(true);
            setUserSpeech('');
            setFeedback(null);
            setMatchScore(null);

            recognition.start();

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setUserSpeech(transcript);

                // Calculate match score
                const target = currentWord.japanese.toLowerCase();
                const spoken = transcript.toLowerCase();

                let score = 0;
                if (spoken === target) {
                    score = 100;
                } else if (spoken.includes(target) || target.includes(spoken)) {
                    score = 80;
                } else {
                    // Calculate character overlap
                    let matches = 0;
                    for (let char of spoken) {
                        if (target.includes(char)) matches++;
                    }
                    score = Math.min(70, Math.round((matches / target.length) * 70));
                }

                setMatchScore(score);

                if (score >= 90) {
                    setFeedback({ type: 'perfect', message: '완벽해요! 🎉 네이티브 발음이에요!' });
                } else if (score >= 70) {
                    setFeedback({ type: 'good', message: '잘했어요! 👍 조금만 더 연습하면 완벽해져요!' });
                } else if (score >= 40) {
                    setFeedback({ type: 'okay', message: '괜찮아요! 💪 천천히 다시 발음해보세요.' });
                } else {
                    setFeedback({ type: 'retry', message: '다시 도전해봐요! 🔄 또박또박 발음해보세요.' });
                }
            };

            recognition.onerror = (event) => {
                setIsListening(false);
                if (event.error === 'no-speech') {
                    setFeedback({ type: 'error', message: '음성이 감지되지 않았어요. 다시 시도해주세요.' });
                } else {
                    setFeedback({ type: 'error', message: '오류가 발생했어요. 다시 시도해주세요.' });
                }
            };

            recognition.onend = () => {
                setIsListening(false);
            };
        };

        const nextWord = () => {
            setCurrentWordIndex((prev) => (prev + 1) % practiceWords.length);
            setUserSpeech('');
            setFeedback(null);
            setMatchScore(null);
        };

        return (
            <div className="min-h-screen relative">
                {/* Background */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${bgTraining})` }}
                >
                    <div className="absolute inset-0 bg-slate-900/70" />
                </div>

                <div className="relative z-10 min-h-screen p-6 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <button onClick={() => setTab('select')} className="flex items-center gap-2 text-gray-300 hover:text-white bg-white/10 backdrop-blur px-4 py-2 rounded-full border border-white/20">
                            <ArrowLeft className="w-4 h-4" /> 돌아가기
                        </button>
                        <div className="bg-emerald-500/20 backdrop-blur px-4 py-2 rounded-full border border-emerald-400/30">
                            <Mic className="w-4 h-4 inline mr-1 text-emerald-400" />
                            <span className="text-emerald-400 text-sm font-medium">AI 발음 연습</span>
                        </div>
                    </div>

                    {/* Progress */}
                    <div className="text-center mb-4">
                        <span className="text-gray-400 text-sm">{currentWordIndex + 1} / {practiceWords.length}</span>
                    </div>

                    {/* Word Card */}
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center border border-white/20 shadow-2xl max-w-md w-full mb-6">
                            <div className="text-5xl font-bold text-white mb-4">{currentWord.japanese}</div>
                            <div className="text-emerald-400 text-lg mb-2">{currentWord.romaji}</div>
                            <div className="text-gray-400">{currentWord.meaning}</div>
                        </div>

                        {/* Record Button */}
                        <button
                            onClick={startListening}
                            disabled={isListening}
                            className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${isListening
                                ? 'bg-red-500 animate-pulse'
                                : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:scale-110'
                                }`}
                        >
                            <Mic className="w-10 h-10 text-white" />
                        </button>
                        <p className="text-gray-400 mt-3 text-sm">
                            {isListening ? '듣고 있어요...' : '버튼을 누르고 발음하세요'}
                        </p>

                        {/* User Speech Display */}
                        {userSpeech && (
                            <div className="mt-6 bg-white/10 backdrop-blur rounded-xl p-4 w-full max-w-md">
                                <p className="text-gray-400 text-sm mb-1">인식된 발음:</p>
                                <p className="text-white text-xl font-bold">{userSpeech}</p>
                                {matchScore !== null && (
                                    <div className="mt-3">
                                        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-500 ${matchScore >= 90 ? 'bg-emerald-500' :
                                                    matchScore >= 70 ? 'bg-green-500' :
                                                        matchScore >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                                                    }`}
                                                style={{ width: `${matchScore}%` }}
                                            />
                                        </div>
                                        <p className={`text-right text-sm mt-1 ${matchScore >= 90 ? 'text-emerald-400' :
                                            matchScore >= 70 ? 'text-green-400' :
                                                matchScore >= 40 ? 'text-yellow-400' : 'text-red-400'
                                            }`}>{matchScore}% 일치</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Feedback */}
                        {feedback && (
                            <div className={`mt-4 p-4 rounded-xl max-w-md w-full text-center ${feedback.type === 'perfect' ? 'bg-emerald-500/20 border border-emerald-400/50 text-emerald-400' :
                                feedback.type === 'good' ? 'bg-green-500/20 border border-green-400/50 text-green-400' :
                                    feedback.type === 'okay' ? 'bg-yellow-500/20 border border-yellow-400/50 text-yellow-400' :
                                        feedback.type === 'retry' ? 'bg-orange-500/20 border border-orange-400/50 text-orange-400' :
                                            'bg-red-500/20 border border-red-400/50 text-red-400'
                                }`}>
                                {feedback.message}
                            </div>
                        )}

                        {/* Next Button */}
                        <button
                            onClick={nextWord}
                            className="mt-6 px-6 py-3 bg-white/10 backdrop-blur text-white rounded-full border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2"
                        >
                            다음 단어 <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Main Select Screen
    return (
        <div className="min-h-screen relative">
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${bgTraining})` }}
            >
                <div className="absolute inset-0 bg-slate-900/60" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-screen flex flex-col overflow-hidden">
                {/* Right Side - Training Content */}
                <div className="flex-1 p-3 overflow-y-auto">
                    {/* Back Button */}
                    <button onClick={onBack} className="flex items-center gap-1 text-gray-300 hover:text-white mb-3 bg-slate-800/50 px-3 py-1.5 rounded-full text-xs">
                        <ArrowLeft className="w-4 h-4" /> 메인으로 돌아가기
                    </button>

                    <div className="text-center mb-4">
                        <Pencil className="w-6 h-6 text-purple-400 mx-auto mb-1" />
                        <h1 className="text-lg font-bold text-white mb-0.5">트레이닝 센터</h1>
                        <div className="flex items-center justify-center gap-1 text-emerald-400">
                            <Zap className="w-3 h-3" />
                            <span className="text-xs">{energy}/5 에너지</span>
                        </div>
                    </div>

                    {/* Chart Section */}
                    <div className="mb-4">
                        <h2 className="text-sm font-bold text-white mb-2 flex items-center gap-1"><BookOpen className="w-4 h-4 text-pink-400" /> 문자 학습</h2>
                        <div className="grid grid-cols-2 gap-2">
                            <button onClick={() => setTab('hiragana-chart')} className="p-3 bg-slate-800/80 rounded-lg border border-pink-400/30 hover:border-pink-400 transition-all">
                                <div className="text-2xl mb-0.5">あ</div>
                                <div className="font-medium text-white text-xs">히라가나 표</div>
                                <div className="text-xs text-gray-400">46자 암기</div>
                            </button>
                            <button onClick={() => setTab('katakana-chart')} className="p-3 bg-slate-800/80 rounded-lg border border-purple-400/30 hover:border-purple-400 transition-all">
                                <div className="text-2xl mb-0.5">ア</div>
                                <div className="font-medium text-white text-xs">가타카나 표</div>
                                <div className="text-xs text-gray-400">46자 암기</div>
                            </button>
                        </div>
                    </div>

                    {/* Quiz Section */}
                    <div className="mb-4">
                        <h2 className="text-sm font-bold text-white mb-2 flex items-center gap-1"><Pencil className="w-4 h-4 text-purple-400" /> 퀴즈 도전</h2>
                        <div className="grid grid-cols-2 gap-2 mb-2">
                            <button onClick={() => startQuiz('hiragana')} disabled={energy <= 0} className="p-3 bg-slate-800/80 rounded-lg border border-pink-400/30 hover:border-pink-400 transition-all disabled:opacity-50">
                                <div className="text-lg mb-0.5">あ→a</div>
                                <div className="font-medium text-white text-xs">히라가나 퀴즈</div>
                            </button>
                            <button onClick={() => startQuiz('katakana')} disabled={energy <= 0} className="p-3 bg-slate-800/80 rounded-lg border border-purple-400/30 hover:border-purple-400 transition-all disabled:opacity-50">
                                <div className="text-lg mb-0.5">ア→a</div>
                                <div className="font-medium text-white text-xs">가타카나 퀴즈</div>
                            </button>
                        </div>
                    </div>

                    {/* Stage Vocabulary */}
                    <div className="mb-4">
                        <h2 className="text-sm font-bold text-white mb-2 flex items-center gap-1"><BookMarked className="w-4 h-4 text-amber-400" /> 스테이지 단어</h2>
                        <div className="space-y-2">
                            <button onClick={() => startQuiz('vocab-1')} disabled={energy <= 0} className="w-full p-3 bg-slate-800/80 rounded-lg border border-pink-400/30 hover:border-pink-400 transition-all disabled:opacity-50 text-left">
                                <div className="flex items-center gap-2">
                                    <img src={girl1Img} alt="하나" className="w-8 h-8 rounded-full object-cover border border-pink-400/50" />
                                    <div>
                                        <div className="font-medium text-pink-400 text-xs">Stage 1 - 하나</div>
                                        <div className="text-xs text-gray-400">기초 인사, 학교 단어</div>
                                    </div>
                                </div>
                            </button>
                            <button onClick={() => startQuiz('vocab-2')} disabled={energy <= 0} className="w-full p-3 bg-slate-800/80 rounded-lg border border-purple-400/30 hover:border-purple-400 transition-all disabled:opacity-50 text-left">
                                <div className="flex items-center gap-2">
                                    <img src={girl2Img} alt="미사키" className="w-8 h-8 rounded-full object-cover border border-purple-400/50" />
                                    <div>
                                        <div className="font-medium text-purple-400 text-xs">Stage 2 - 미사키</div>
                                        <div className="text-xs text-gray-400">존댓말, 감정 표현</div>
                                    </div>
                                </div>
                            </button>
                            <button onClick={() => startQuiz('vocab-3')} disabled={energy <= 0} className="w-full p-3 bg-slate-800/80 rounded-lg border border-amber-400/30 hover:border-amber-400 transition-all disabled:opacity-50 text-left">
                                <div className="flex items-center gap-2">
                                    <img src={girl3Img} alt="히나타" className="w-8 h-8 rounded-full object-cover border border-amber-400/50" />
                                    <div>
                                        <div className="font-medium text-amber-400 text-xs">Stage 3 - 히나타</div>
                                        <div className="text-xs text-gray-400">구어체, 카페 표현</div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* AI Pronunciation Practice */}
                    <div className="mb-4">
                        <h2 className="text-sm font-bold text-white mb-2 flex items-center gap-1"><Mic className="w-4 h-4 text-emerald-400" /> AI 발음 연습</h2>
                        <button
                            onClick={() => setTab('pronunciation')}
                            className="w-full p-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg border border-emerald-400/30 hover:border-emerald-400 transition-all text-left"
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-emerald-500/30 flex items-center justify-center">
                                    <Volume2 className="w-4 h-4 text-emerald-400" />
                                </div>
                                <div>
                                    <div className="font-medium text-emerald-400 text-xs">발음 분석 시작</div>
                                    <div className="text-xs text-gray-400">AI가 당신의 발음을 분석해드려요</div>
                                </div>
                            </div>
                        </button>
                    </div>

                    {energy <= 0 && (
                        <div className="text-center">
                            <button onClick={() => setEnergy(5)} className="px-6 py-3 bg-emerald-500 text-white rounded-full">
                                <Zap className="w-5 h-5 inline mr-2" /> 에너지 충전
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Dictionary
function Dictionary({ learnedWords, wrongWords, setWrongWords, onBack }) {
    const removeWord = (index) => {
        setWrongWords(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="h-screen relative overflow-hidden">
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${bgTraining})` }}
            >
                <div className="absolute inset-0 bg-slate-900/50" />
            </div>

            <div className="relative z-10 h-full flex flex-col p-3">
                {/* Back Button */}
                <button onClick={onBack} className="flex items-center gap-1 text-gray-300 hover:text-white mb-3 bg-white/10 backdrop-blur px-3 py-1.5 rounded-full border border-white/20 text-xs w-fit">
                    <ArrowLeft className="w-3 h-3" /> 메인으로 돌아가기
                </button>

                {/* Header */}
                <div className="text-center mb-4">
                    <div className="bg-white/10 backdrop-blur rounded-xl p-3 inline-block border border-white/20">
                        <BookMarked className="w-8 h-8 text-amber-400 mx-auto mb-1" />
                        <h1 className="text-lg font-bold text-white">틀린 단어 복습</h1>
                        <p className="text-gray-300 text-xs">{wrongWords.length}개 단어 복습 필요</p>
                    </div>
                </div>

                {/* Wrong Words Section */}
                <div className="flex-1 overflow-y-auto">
                    {wrongWords.length === 0 ? (
                        <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center max-w-xs mx-auto border border-white/20">
                            <Star className="w-10 h-10 text-yellow-400 mx-auto mb-2" />
                            <h2 className="text-base font-bold text-white mb-1">완벽해요!</h2>
                            <p className="text-gray-300 text-xs">틀린 단어가 없어요!<br />트레이닝 센터에서 퀴즈를 풀어보세요.</p>
                        </div>
                    ) : (
                        <div className="max-w-sm mx-auto space-y-2">
                            {wrongWords.map((word, idx) => (
                                <div key={idx} className="bg-white/15 backdrop-blur rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all">
                                    <div className="flex justify-between items-center">
                                        <div className="flex-1">
                                            <div className="text-base font-bold text-white">{word.japanese}</div>
                                            <div className="text-gray-400 text-xs">{word.romaji}</div>
                                        </div>
                                        <div className="text-right flex-1">
                                            <div className="font-medium text-amber-300 text-sm">{word.meaning}</div>
                                            <div className="text-xs text-gray-400">Stage {word.stage}</div>
                                        </div>
                                        <button
                                            onClick={() => removeWord(idx)}
                                            className="ml-2 p-1.5 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-400 transition-all"
                                            title="다 외웠어요!"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* Clear All Button */}
                            <button
                                onClick={() => setWrongWords([])}
                                className="w-full py-2 bg-white/10 backdrop-blur rounded-full text-gray-300 text-sm hover:bg-white/20 border border-white/20 transition-all"
                            >
                                전체 지우기
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Ranking Dashboard
function Ranking({ playerName, affection, onBack }) {
    const [rankings, setRankings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [myRank, setMyRank] = useState(null);

    const totalScore = affection.girl1 + affection.girl2 + affection.girl3;

    // Fetch rankings from Firebase
    useEffect(() => {
        const fetchRankings = async () => {
            try {
                const rankingsRef = collection(db, 'rankings');
                const q = query(rankingsRef, orderBy('score', 'desc'), limit(100));
                const querySnapshot = await getDocs(q);

                const rankingData = [];
                querySnapshot.forEach((doc) => {
                    rankingData.push({ id: doc.id, ...doc.data() });
                });

                setRankings(rankingData);

                // Find my rank
                const myIndex = rankingData.findIndex(r => r.name === playerName && r.score === totalScore);
                if (myIndex !== -1) {
                    setMyRank(myIndex + 1);
                }
            } catch (error) {
                console.error('Error fetching rankings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRankings();
    }, [playerName, totalScore]);

    const getRankColor = (rank) => {
        if (rank === 1) return 'from-yellow-400 to-amber-500';
        if (rank === 2) return 'from-gray-300 to-gray-400';
        if (rank === 3) return 'from-amber-600 to-amber-700';
        return 'from-slate-600 to-slate-700';
    };

    const getRankIcon = (rank) => {
        if (rank === 1) return '🥇';
        if (rank === 2) return '🥈';
        if (rank === 3) return '🥉';
        return rank;
    };

    return (
        <div className="h-screen relative overflow-hidden">
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${bgTraining})` }}
            >
                <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-sm" />
            </div>

            <div className="relative z-10 h-full flex flex-col p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <button onClick={onBack} className="flex items-center gap-1 text-gray-400 hover:text-white text-sm">
                        <ArrowLeft className="w-4 h-4" /> 돌아가기
                    </button>
                    <div className="flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-yellow-400" />
                        <span className="text-white font-bold">랭킹</span>
                    </div>
                    <div className="w-20" /> {/* Spacer */}
                </div>

                {/* My Score Card */}
                <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-xl rounded-2xl p-4 border border-pink-500/30 mb-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-gray-400 text-xs mb-1">내 점수</div>
                            <div className="text-white font-bold text-lg">{playerName || '이름 없음'}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                                {totalScore}
                            </div>
                            <div className="text-xs text-gray-400">총 호감도</div>
                        </div>
                    </div>

                    {/* Individual scores */}
                    <div className="flex gap-2 mt-3">
                        <div className="flex-1 bg-pink-500/20 rounded-lg p-2 text-center">
                            <div className="text-pink-400 text-xs">하나</div>
                            <div className="text-white font-bold">{affection.girl1}%</div>
                        </div>
                        <div className="flex-1 bg-purple-500/20 rounded-lg p-2 text-center">
                            <div className="text-purple-400 text-xs">미사키</div>
                            <div className="text-white font-bold">{affection.girl2}%</div>
                        </div>
                        <div className="flex-1 bg-amber-500/20 rounded-lg p-2 text-center">
                            <div className="text-amber-400 text-xs">히나타</div>
                            <div className="text-white font-bold">{affection.girl3}%</div>
                        </div>
                    </div>

                    {/* Show my rank if found */}
                    {myRank && (
                        <div className="mt-4 text-center p-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl border border-pink-500/30">
                            <span className="text-pink-400 text-sm">현재 순위: </span>
                            <span className="text-white font-bold text-lg">{myRank}위</span>
                        </div>
                    )}
                </div>

                {/* Rankings List */}
                <div className="flex-1 overflow-y-auto">
                    <div className="text-gray-400 text-xs mb-2 flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        전체 랭킹 TOP 100
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center h-40">
                            <RefreshCw className="w-8 h-8 text-pink-400 animate-spin" />
                        </div>
                    ) : rankings.length === 0 ? (
                        <div className="text-center py-10">
                            <Trophy className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                            <p className="text-gray-500">아직 등록된 랭킹이 없습니다</p>
                            <p className="text-gray-600 text-sm mt-1">첫 번째 랭커가 되어보세요!</p>
                        </div>
                    ) : (
                        <div className="space-y-2 pb-4">
                            {rankings.map((player, index) => {
                                const rank = index + 1;
                                const isMe = player.name === playerName && player.score === totalScore;

                                return (
                                    <div
                                        key={player.id}
                                        className={`flex items-center gap-3 p-3 rounded-xl backdrop-blur transition-all ${isMe
                                            ? 'bg-pink-500/20 border border-pink-500/50 ring-2 ring-pink-500/30'
                                            : 'bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50'
                                            }`}
                                    >
                                        {/* Rank */}
                                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getRankColor(rank)} flex items-center justify-center font-bold text-white shadow-lg ${rank <= 3 ? 'text-lg' : 'text-sm'}`}>
                                            {getRankIcon(rank)}
                                        </div>

                                        {/* Player Info */}
                                        <div className="flex-1">
                                            <div className={`font-bold ${isMe ? 'text-pink-300' : 'text-white'}`}>
                                                {player.name}
                                                {isMe && <span className="ml-2 text-xs text-pink-400">(나)</span>}
                                            </div>
                                            <div className="flex gap-2 text-xs">
                                                <span className="text-pink-400/70">♥{player.girl1 || 0}</span>
                                                <span className="text-purple-400/70">♥{player.girl2 || 0}</span>
                                                <span className="text-amber-400/70">♥{player.girl3 || 0}</span>
                                            </div>
                                        </div>

                                        {/* Score */}
                                        <div className="text-right">
                                            <div className={`text-xl font-bold ${rank === 1 ? 'text-yellow-400' : rank === 2 ? 'text-gray-300' : rank === 3 ? 'text-amber-500' : 'text-white'}`}>
                                                {player.score}
                                            </div>
                                            <div className="text-xs text-gray-500">점</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function Store({ onBack }) {
    const [activeTab, setActiveTab] = useState('currency');

    const tabs = [
        { id: 'currency', label: '재화', icon: Gem },
        { id: 'study', label: '학습', icon: BookOpen },
        { id: 'item', label: '아이템', icon: Zap },
        { id: 'skin', label: '의상', icon: Shirt },
        { id: 'free', label: '무료', icon: Gift },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'currency':
                return (
                    <div className="space-y-4 pb-24">
                        {/* First Purchase Banner */}
                        <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-4 shadow-lg mb-6 relative overflow-hidden">
                            <div className="absolute right-0 top-0 opacity-20 transform translate-x-4 -translate-y-4">
                                <Gem className="w-32 h-32 text-white" />
                            </div>
                            <div className="relative z-10">
                                <div className="inline-block bg-white/20 px-2 py-1 rounded text-xs text-white font-bold mb-1">첫 구매 한정</div>
                                <h3 className="text-xl font-bold text-white mb-1">루비 2배 지급!</h3>
                                <p className="text-white/90 text-sm">첫 충전 시 모든 패키지 1+1 혜택</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { amount: 10, bonus: 0, price: '1,500원' },
                                { amount: 50, bonus: 5, price: '5,900원', popular: true },
                                { amount: 100, bonus: 15, price: '12,000원' },
                                { amount: 300, bonus: 50, price: '33,000원' },
                                { amount: 500, bonus: 100, price: '55,000원' },
                                { amount: 1000, bonus: 300, price: '99,000원' },
                            ].map((item, idx) => (
                                <div key={idx} className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-4 flex flex-col items-center relative overflow-hidden group">
                                    {item.popular && (
                                        <div className="absolute top-0 right-0 bg-yellow-500 text-xs font-bold text-slate-900 px-2 py-0.5 rounded-bl-lg">
                                            POPULAR
                                        </div>
                                    )}
                                    <Gem className="w-8 h-8 text-pink-400 mb-2 group-hover:scale-110 transition-transform" />
                                    <div className="text-white font-bold text-lg">{item.amount} <span className="text-xs text-pink-400">+{item.bonus}</span></div>
                                    <button className="mt-3 w-full bg-slate-700 hover:bg-pink-500 hover:text-white transition-colors py-2 rounded-lg text-sm text-gray-300 font-medium">
                                        {item.price}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'study':
                return (
                    <div className="space-y-4 pb-24">
                        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-purple-400" /> 구독 & 멤버십
                        </h3>
                        {/* Premium Pass */}
                        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/30 rounded-2xl p-5 shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-purple-500/20 w-32 h-32 rounded-full blur-2xl -mr-10 -mt-10" />
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-white">프리미엄 패스</h3>
                                        <p className="text-gray-400 text-sm">연간 구독 시 2개월 무료!</p>
                                    </div>
                                    <Crown className="w-8 h-8 text-yellow-400" />
                                </div>
                                <ul className="space-y-2 mb-6 text-sm text-gray-300">
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-400" />AI 실시간 발음 피드백</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-400" />음성 대화 시 호감도 보너스</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-400" />광고 없는 쾌적한 플레이</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-400" />계절 한정 특별 코스튬</li>
                                </ul>
                                <div className="flex gap-3">
                                    <button className="flex-1 bg-slate-700 py-3 rounded-xl text-gray-300 text-sm font-bold border border-slate-600">월 9,900원</button>
                                    <button className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 py-3 rounded-xl text-white text-sm font-bold shadow-lg shadow-purple-500/20">연 59,000원</button>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-white mt-8 mb-2">학습 패키지</h3>
                        <div className="bg-slate-800/50 rounded-xl p-4 flex items-center gap-4 border border-slate-700">
                            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xl">N3</div>
                            <div className="flex-1">
                                <div className="text-white font-bold">JLPT N3 대비 팩</div>
                                <div className="text-xs text-gray-400">전용 시나리오 + 필수 단어장</div>
                            </div>
                            <button className="bg-blue-600/20 text-blue-400 px-4 py-2 rounded-lg text-sm font-bold">12,000원</button>
                        </div>
                        <div className="bg-slate-800/50 rounded-xl p-4 flex items-center gap-4 border border-slate-700">
                            <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xl">PDF</div>
                            <div className="flex-1">
                                <div className="text-white font-bold">학습 자료 추출권</div>
                                <div className="text-xs text-gray-400">오답 노트 & 학습 자료 PDF 다운로드</div>
                            </div>
                            <button className="bg-emerald-600/20 text-emerald-400 px-4 py-2 rounded-lg text-sm font-bold">5,500원</button>
                        </div>
                    </div>
                );
            case 'item':
                return (
                    <div className="space-y-4 pb-24">
                        <div className="grid grid-cols-1 gap-3">
                            {[
                                { name: '타임 리프', desc: '선택지 실패 시 직전으로 되돌아갑니다.', icon: Clock, color: 'blue', price: '루비 5개' },
                                { name: '에너지 충전', desc: '스토리 진행에 필요한 에너지를 즉시 회복!', icon: Zap, color: 'yellow', price: '루비 10개' },
                                { name: '정답 힌트권', desc: '어려운 퀴즈에서 정답을 미리 보여줍니다.', icon: BookOpen, color: 'green', price: '루비 3개' }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full bg-${item.color}-500/20 flex items-center justify-center`}>
                                        <item.icon className={`w-6 h-6 text-${item.color}-400`} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-white font-bold">{item.name}</div>
                                        <div className="text-xs text-gray-400">{item.desc}</div>
                                    </div>
                                    <button className="bg-slate-700 px-4 py-2 rounded-lg text-sm font-bold text-pink-400 flex items-center gap-1">
                                        <Gem className="w-3 h-3" /> {item.price}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'skin':
                return (
                    <div className="space-y-4 pb-24">
                        <h3 className="text-lg font-bold text-white mb-2">프리미엄 의상실</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { name: '여름 교복', type: 'LIMITED', image: girl1Img },
                                { name: '사복 데이트', type: 'EPIC', image: girl2Img },
                                { name: '메이드복', type: 'LEGENDARY', image: girl3Img },
                                { name: '겨울 코트', type: 'RARE', image: girl1Img },
                            ].map((skin, idx) => (
                                <div key={idx} className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 group">
                                    <div className="aspect-[3/4] bg-slate-900 relative">
                                        <div className="absolute top-2 left-2 bg-black/60 text-[10px] text-white px-2 py-0.5 rounded backdrop-blur">
                                            {skin.type}
                                        </div>
                                        <img src={skin.image} alt={skin.name} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8">
                                            <div className="text-white font-bold text-sm">{skin.name}</div>
                                        </div>
                                    </div>
                                    <div className="p-3">
                                        <button className="w-full bg-slate-700 hover:bg-pink-500 py-2 rounded-lg text-xs font-bold text-white transition-colors">
                                            구매하기
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'free':
                return (
                    <div className="space-y-4 pb-24">
                        <div className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl p-5 shadow-lg flex items-center justify-between">
                            <div>
                                <div className="text-xs text-blue-200 font-bold mb-1">매일매일 리필!</div>
                                <h3 className="text-xl font-bold text-white mb-2">일일 무료 패키지</h3>
                                <div className="flex gap-2">
                                    <span className="bg-black/20 px-2 py-1 rounded text-xs text-white">에너지 +10</span>
                                    <span className="bg-black/20 px-2 py-1 rounded text-xs text-white">루비 +1</span>
                                </div>
                            </div>
                            <Gift className="w-12 h-12 text-white/90 animate-bounce" />
                        </div>

                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-pink-500/20 flex items-center justify-center">
                                    <PlayCircle className="w-6 h-6 text-pink-400" />
                                </div>
                                <div>
                                    <div className="text-white font-bold">광고 보고 무료 루비</div>
                                    <div className="text-xs text-gray-400">하루 최대 5회 가능 (0/5)</div>
                                </div>
                            </div>
                            <button className="bg-pink-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-pink-500/20">
                                받기
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="h-screen bg-slate-900 flex flex-col relative overflow-hidden">
            {/* Header */}
            <div className="p-4 flex items-center gap-4 bg-slate-900/50 backdrop-blur z-20">
                <button
                    onClick={onBack}
                    className="p-2 -ml-2 rounded-full hover:bg-slate-800 transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-white" />
                </button>
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-pink-400" /> 상점
                    </h2>
                </div>
                <div className="ml-auto flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
                    <Gem className="w-4 h-4 text-pink-400" />
                    <span className="text-white font-bold text-sm">1,250</span>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="px-4 pb-2 overflow-x-auto scrollbar-hide">
                <div className="flex gap-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeTab === tab.id
                                ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30'
                                : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-hide">
                {renderContent()}
            </div>
        </div>
    );
}
