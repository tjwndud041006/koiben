import React, { useState, useEffect } from 'react';
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
    Volume2
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
    const [currentStage, setCurrentStage] = useState(1);
    const [unlockedStage, setUnlockedStage] = useState(1); // Highest unlocked stage
    const [affection, setAffection] = useState({ girl1: 0, girl2: 0, girl3: 0 });
    const [learnedWords, setLearnedWords] = useState([]);
    const [wrongWords, setWrongWords] = useState([]);
    const [energy, setEnergy] = useState(5);
    const [selectedEnding, setSelectedEnding] = useState(null);

    const handleStageComplete = (newAffection) => {
        setAffection(prev => ({
            girl1: prev.girl1 + (newAffection.girl1 || 0),
            girl2: prev.girl2 + (newAffection.girl2 || 0),
            girl3: prev.girl3 + (newAffection.girl3 || 0),
        }));

        if (currentStage < 4) {
            setCurrentStage(prev => prev + 1);
            // Unlock next stage
            setUnlockedStage(prev => Math.max(prev, currentStage + 1));
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 overflow-hidden font-sans">
            {currentScreen === 'title' && (
                <TitleScreen onStart={() => setCurrentScreen('main')} />
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
        </div>
    );
}

// Stage Select Screen
function StageSelect({ unlockedStage, onSelectStage, onBack }) {
    const stages = [
        { id: 1, title: '하나 - 학교', girl: 'girl1', color: 'pink', desc: '귀여운 여사친과의 첫 만남' },
        { id: 2, title: '미사키 - 마을', girl: 'girl2', color: 'purple', desc: '지적인 소녀와의 조우' },
        { id: 3, title: '히나타 - 카페', girl: 'girl3', color: 'amber', desc: '새침한 알바생과의 만남' },
        { id: 4, title: '고백의 순간', girl: null, color: 'rose', desc: '마지막 선택의 시간' },
    ];

    return (
        <div className="min-h-screen relative">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${bgSchool})` }}
            >
                <div className="absolute inset-0 bg-slate-900/80" />
            </div>

            <div className="relative z-10 min-h-screen flex flex-col p-6">
                <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8">
                    <ArrowLeft className="w-5 h-5" /> 돌아가기
                </button>

                <div className="text-center mb-8">
                    <BookOpen className="w-12 h-12 text-pink-400 mx-auto mb-2" />
                    <h1 className="text-3xl font-bold text-white mb-2">스테이지 선택</h1>
                    <p className="text-gray-400">플레이할 스테이지를 선택하세요</p>
                </div>

                <div className="flex-1 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-6 max-w-2xl w-full">
                        {stages.map((stage) => {
                            const isLocked = stage.id > unlockedStage;
                            const colorClasses = {
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
                                    className={`p-6 rounded-2xl bg-slate-800/80 backdrop-blur border-2 transition-all ${isLocked ? lockedClass : colorClasses[stage.color]}`}
                                >
                                    <div className="flex items-center gap-4">
                                        {isLocked ? (
                                            <div className="w-20 h-28 rounded-lg border-2 border-gray-600/50 bg-slate-700/50 flex items-center justify-center">
                                                <Save className="w-10 h-10 text-gray-500" />
                                            </div>
                                        ) : stage.girl ? (
                                            <img
                                                src={characters[stage.girl].image}
                                                alt={stage.title}
                                                className="w-20 h-28 object-cover rounded-lg border-2 border-white/20"
                                            />
                                        ) : (
                                            <div className="w-20 h-28 rounded-lg border-2 border-white/20 bg-gradient-to-br from-pink-500/30 to-purple-500/30 flex items-center justify-center">
                                                <Heart className="w-10 h-10 text-pink-400" />
                                            </div>
                                        )}
                                        <div className="text-left">
                                            <div className="text-sm text-gray-400 mb-1">Stage {stage.id}</div>
                                            <div className={`text-xl font-bold mb-1 ${isLocked ? 'text-gray-500' : 'text-white'}`}>
                                                {isLocked ? '🔒 ' : ''}{stage.title}
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                {isLocked ? '이전 스테이지를 클리어하세요' : stage.desc}
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
                <div className="flex justify-center gap-4 mb-10" style={{ animation: 'fadeIn 1s ease-out' }}>
                    <img src={girl1Img} alt="Girl 1" className="w-28 h-36 object-cover rounded-2xl shadow-2xl border-4 border-pink-400/50" />
                    <img src={girl3Img} alt="Girl 3" className="w-28 h-36 object-cover rounded-2xl shadow-2xl border-4 border-amber-400/50" />
                    <img src={boyImg} alt="Boy" className="w-32 h-40 object-cover rounded-2xl shadow-2xl border-4 border-blue-400/50" />
                    <img src={girl2Img} alt="Girl 2" className="w-28 h-36 object-cover rounded-2xl shadow-2xl border-4 border-purple-400/50" />
                </div>

                {/* Title */}
                <div style={{ animation: 'fadeIn 1s ease-out 0.3s both' }}>
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <Heart className="w-12 h-12 text-pink-400 fill-pink-400" />
                        <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400">
                            恋勉
                        </h1>
                        <Heart className="w-12 h-12 text-purple-400 fill-purple-400" />
                    </div>
                    <h2 className="text-3xl text-pink-300/80 tracking-widest mb-3">KOIBEN</h2>
                    <p className="text-gray-400 text-xl">~ 사랑하며 배우는 일본어 ~</p>
                </div>

                {/* Start Button */}
                {showStart && (
                    <button
                        onClick={onStart}
                        className="mt-14 group relative px-20 py-5 overflow-hidden rounded-full"
                        style={{ animation: 'fadeIn 0.8s ease-out' }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500" />
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-px bg-slate-900/80 rounded-full group-hover:bg-slate-900/60 transition-colors" />
                        <span className="relative flex items-center gap-4 text-2xl text-white font-medium">
                            <Play className="w-7 h-7 fill-current" />
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

            <div className="relative z-10 min-h-screen flex flex-col p-6">
                {/* Header Stats */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex gap-3 flex-wrap">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/20 border border-pink-400/30">
                            <Heart className="w-5 h-5 text-pink-400" />
                            <span className="text-pink-400 text-base font-medium">{characters.girl1.name}: {affection.girl1}%</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-400/30">
                            <Heart className="w-5 h-5 text-purple-400" />
                            <span className="text-purple-400 text-base font-medium">{characters.girl2.name}: {affection.girl2}%</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30">
                            <Heart className="w-5 h-5 text-amber-400" />
                            <span className="text-amber-400 text-base font-medium">{characters.girl3.name}: {affection.girl3}%</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30">
                        <Zap className="w-5 h-5 text-emerald-400" />
                        <span className="text-emerald-400 text-base font-medium">{energy}/5</span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col items-center justify-center">
                    {/* Character Display */}
                    <div className="flex items-end gap-4 mb-10">
                        <div className="text-center">
                            <img src={girl1Img} alt="Sakura" className="w-24 h-32 object-cover rounded-xl shadow-xl border-3 border-pink-400/50" />
                            <p className="text-pink-400 text-base font-medium mt-2">사쿠라</p>
                        </div>
                        <div className="text-center">
                            <img src={girl3Img} alt="Hinata" className="w-24 h-32 object-cover rounded-xl shadow-xl border-3 border-amber-400/50" />
                            <p className="text-amber-400 text-base font-medium mt-2">히나타</p>
                        </div>
                        <div className="text-center -mb-4">
                            <Crown className="w-6 h-6 text-blue-400 mx-auto mb-1" />
                            <img src={boyImg} alt="You" className="w-32 h-40 object-cover rounded-xl shadow-2xl border-3 border-blue-400/50" />
                            <p className="text-blue-400 text-base font-medium mt-2">나</p>
                        </div>
                        <div className="text-center">
                            <img src={girl2Img} alt="Yuki" className="w-24 h-32 object-cover rounded-xl shadow-xl border-3 border-purple-400/50" />
                            <p className="text-purple-400 text-base font-medium mt-2">유키</p>
                        </div>
                    </div>

                    {/* Stage indicator */}
                    <div className="bg-slate-800/80 backdrop-blur rounded-xl px-6 py-3 mb-8 border border-slate-700/50">
                        <div className="flex items-center gap-4">
                            <span className="text-gray-400 text-lg">현재 스테이지:</span>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4].map(stage => (
                                    <div
                                        key={stage}
                                        className={`w-10 h-3 rounded-full transition-colors ${stage <= currentStage
                                            ? 'bg-gradient-to-r from-pink-500 to-purple-500'
                                            : 'bg-slate-700'
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-white text-lg font-bold">{currentStage}/4</span>
                        </div>
                    </div>

                    {/* Menu Buttons */}
                    <div className="w-full max-w-lg space-y-4">
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
            className={`group w-full relative overflow-hidden rounded-2xl transition-all hover:scale-102 ${highlight ? 'ring-2 ring-pink-400/50' : ''
                }`}
        >
            <div className="absolute inset-0 bg-slate-800/80 backdrop-blur" />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 to-purple-500/0 group-hover:from-pink-500/20 group-hover:to-purple-500/20 transition-all" />
            <div className="relative flex items-center gap-5 p-5">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center border ${highlight
                    ? 'bg-gradient-to-br from-pink-500/30 to-purple-500/30 border-pink-400/30'
                    : 'bg-slate-700/50 border-slate-600/50'
                    }`}>
                    <Icon className={`w-8 h-8 ${highlight ? 'text-pink-400' : 'text-gray-400'}`} />
                </div>
                <div className="text-left flex-1">
                    <div className="text-xl font-bold text-white">{title}</div>
                    <div className="text-base text-gray-400">{subtitle}</div>
                </div>
                <ChevronRight className="w-7 h-7 text-gray-500 group-hover:text-pink-400 transition-colors" />
            </div>
        </button>
    );
}

// Story Mode
function StoryMode({ currentStage, affection, setAffection, onStageComplete, setLearnedWords, onBack, selectedEnding, setSelectedEnding }) {
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
    const currentGirl = inEnding && selectedEnding
        ? selectedEnding
        : stage?.girl;

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

        setTimeout(handleNext, 1200);
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
        const girlAffection = affection[chosenGirl] || 0;

        // Option 3: Affection-based ending determination
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
            // affection 30 = 0% chance, affection 80 = 100% chance
            const probability = (girlAffection - 30) / 50; // 0.0 to 1.0
            isHappyEnding = Math.random() < probability;
        }

        setSelectedEnding(chosenGirl);
        setIsSadEnding(!isHappyEnding);
        setInEnding(true);
        setDialogueIndex(0);
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

                {/* Ending Card - Bottom Center */}
                <div className={`relative z-20 text-center backdrop-blur-lg rounded-3xl p-8 border max-w-md mx-4 shadow-2xl ${isSadEnding ? 'bg-slate-800/50 border-gray-500/30' : 'bg-white/15 border-white/30'}`}>
                    {/* Icon */}
                    {isSadEnding ? (
                        <Heart className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                    ) : (
                        <Sparkles className={`w-10 h-10 text-${endingColor}-400 mx-auto mb-3 animate-pulse`} />
                    )}

                    {/* Title */}
                    <h1 className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${gradientColors} mb-3`}>
                        {currentDialogue.text}
                    </h1>

                    {/* Subtitle */}
                    <p className={`text-lg mb-6 leading-relaxed ${isSadEnding ? 'text-gray-400' : 'text-gray-200'}`}>
                        {currentDialogue.subtitle}
                    </p>

                    {/* Character badge */}
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${isSadEnding ? 'bg-gray-500/20 border border-gray-400/30' : `bg-${endingColor}-500/20 border border-${endingColor}-400/50`}`}>
                        {isSadEnding ? (
                            <>
                                <X className="w-5 h-5 text-gray-400" />
                                <span className="text-gray-400 font-medium">다음에는 더 노력해보자...</span>
                            </>
                        ) : (
                            <>
                                <Heart className={`w-5 h-5 text-${endingColor}-400 fill-${endingColor}-400`} />
                                <span className={`text-${endingColor}-400 font-medium`}>{characters[selectedEnding].name}와 함께한 추억</span>
                            </>
                        )}
                    </div>

                    {/* Back button */}
                    <button
                        onClick={onBack}
                        className={`w-full px-8 py-4 bg-gradient-to-r ${gradientColors} text-white rounded-full text-lg font-bold shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2`}
                    >
                        <Home className="w-5 h-5" /> 메인으로 돌아가기
                    </button>
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

            {/* Boy Character - Always on Right */}
            <div className="absolute bottom-48 right-[180px] z-10">
                <img
                    src={boyImg}
                    alt="주인공"
                    className="h-[800px] w-auto object-contain filter drop-shadow-2xl"
                />
            </div>

            {/* Girl Character - On Left when speaking */}
            {currentGirl && currentDialogue.speaker !== 'narration' && currentDialogue.speaker !== 'quiz' &&
                currentDialogue.speaker !== 'choice' && currentDialogue.speaker !== 'finalChoice' && (
                    <div className="absolute bottom-48 left-[180px] z-10">
                        <img
                            src={characters[currentGirl].image}
                            alt={characters[currentGirl].name}
                            className="h-[800px] w-auto object-contain filter drop-shadow-2xl"
                        />
                    </div>
                )}

            {/* Top Stats */}
            <div className="absolute top-4 left-4 z-30">
                <button onClick={onBack} className="flex items-center gap-2 text-gray-300 hover:text-white bg-slate-800/70 backdrop-blur px-4 py-2 rounded-full border border-slate-600/50 transition-all">
                    <ArrowLeft className="w-4 h-4" /> 돌아가기
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

            {/* Dialogue Box */}
            <div className="absolute bottom-0 left-0 right-0 z-20">
                <div className="relative mx-4 mb-16 overflow-hidden rounded-t-2xl">
                    {/* White semi-transparent background */}
                    <div className="absolute inset-0 bg-white/25 backdrop-blur-md rounded-t-2xl" />

                    <div className="relative p-8">
                        {/* Speaker Name */}
                        {currentDialogue.speaker !== 'narration' && currentDialogue.speaker !== 'quiz' &&
                            currentDialogue.speaker !== 'choice' && currentDialogue.speaker !== 'finalChoice' && currentGirl && (
                                <div className="mb-4">
                                    <span className={`inline-block px-6 py-2 rounded-lg text-xl text-white font-bold ${currentGirl === 'girl1' ? 'bg-pink-500/80' : 'bg-purple-500/80'
                                        }`}>
                                        {characters[currentGirl].name}
                                    </span>
                                </div>
                            )}

                        {/* Quiz */}
                        {currentDialogue.speaker === 'quiz' && (
                            <div>
                                <div className="text-white text-2xl mb-8">{currentDialogue.question}</div>
                                <div className="grid grid-cols-2 gap-4">
                                    {currentDialogue.options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleQuizAnswer(idx)}
                                            disabled={quizAnswer !== null}
                                            className={`p-5 rounded-xl text-xl font-bold transition-all ${quizAnswer !== null
                                                ? idx === currentDialogue.correct
                                                    ? 'bg-green-500/80 text-white'
                                                    : 'bg-slate-600/50 text-gray-400'
                                                : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                                                }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                                {quizAnswer && (
                                    <div className={`mt-6 text-center text-2xl font-bold ${quizAnswer === 'correct' ? 'text-green-400' : 'text-red-400'}`}>
                                        {quizAnswer === 'correct' ? '✓ 정답!' : '✗ 아쉬워요...'}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Choice */}
                        {currentDialogue.speaker === 'choice' && (
                            <div>
                                <div className="text-white text-2xl mb-8">{currentDialogue.question}</div>
                                <div className="space-y-4">
                                    {currentDialogue.options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleChoice(idx)}
                                            className="w-full p-5 rounded-xl text-xl font-medium bg-white/10 text-white hover:bg-white/20 border border-white/20 transition-all text-left"
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
                                <div className="text-center mb-8">
                                    <Users className="w-16 h-16 text-pink-400 mx-auto mb-3" />
                                    <div className="text-white text-2xl">{currentDialogue.question}</div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    {currentDialogue.options.map((option, idx) => {
                                        const girlKey = ['girl1', 'girl2', 'girl3'][idx];
                                        const bgColors = ['bg-pink-500/30 hover:bg-pink-500/50 border-pink-400/50 text-pink-300', 'bg-purple-500/30 hover:bg-purple-500/50 border-purple-400/50 text-purple-300', 'bg-amber-500/30 hover:bg-amber-500/50 border-amber-400/50 text-amber-300'];
                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => handleFinalChoice(idx)}
                                                className={`p-4 rounded-xl text-lg font-bold transition-all text-center border-2 ${bgColors[idx]}`}
                                            >
                                                <img
                                                    src={characters[girlKey].image}
                                                    alt={option}
                                                    className="w-24 h-32 object-cover rounded-lg mx-auto mb-2 border-2 border-white/20"
                                                />
                                                {option}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Regular dialogue */}
                        {currentDialogue.speaker !== 'quiz' && currentDialogue.speaker !== 'choice' && currentDialogue.speaker !== 'finalChoice' && (
                            <div onClick={handleNext} className="cursor-pointer">
                                <p className={`text-white text-2xl leading-relaxed mb-3 transition-opacity ${textRevealed ? 'opacity-100' : 'opacity-0'}`}>
                                    {currentDialogue.text}
                                </p>
                                {currentDialogue.textJp && (
                                    <p className={`text-pink-300/70 text-xl transition-opacity ${textRevealed ? 'opacity-100' : 'opacity-0'}`}>
                                        {currentDialogue.textJp}
                                    </p>
                                )}
                                <div className="absolute bottom-6 right-8 flex items-center gap-1 text-pink-300/60 animate-pulse">
                                    <ChevronRight className="w-6 h-6" />
                                    <ChevronRight className="w-6 h-6 -ml-3" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Menu */}
                <div className="absolute bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur border-t border-slate-700/50">
                    <div className="flex items-center justify-center gap-1 py-2 px-4 text-xs">
                        <MenuBarButton icon={Save} label="SAVE" />
                        <MenuBarButton icon={Download} label="LOAD" />
                        <MenuBarButton icon={FastForward} label="SKIP" />
                        <MenuBarButton icon={PlayCircle} label="AUTO" active={autoPlay} onClick={() => setAutoPlay(!autoPlay)} />
                        <MenuBarButton icon={ScrollText} label="LOG" />
                        <MenuBarButton icon={Maximize} label="SCREEN" />
                        <MenuBarButton icon={Home} label="TITLE" onClick={onBack} />
                    </div>
                </div>
            </div>
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
function TrainingMode({ learnedWords, setLearnedWords, wrongWords, setWrongWords, energy, setEnergy, onBack }) {
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
            return shuffled.map(item => ({
                question: item.meaning,
                correct: item.japanese,
                options: [item.japanese, ...stageVocab.filter(v => v.japanese !== item.japanese).sort(() => Math.random() - 0.5).slice(0, 3).map(v => v.japanese)].sort(() => Math.random() - 0.5),
                vocabData: item
            }));
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
        <div className="min-h-screen relative">
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${bgTraining})` }}
            >
                <div className="absolute inset-0 bg-slate-900/70" />
            </div>

            <div className="relative z-10 p-4">
                <button onClick={() => setTab('select')} className="flex items-center gap-2 text-gray-300 hover:text-white mb-4 bg-white/10 backdrop-blur px-4 py-2 rounded-full border border-white/20">
                    <ArrowLeft className="w-5 h-5" /> 돌아가기
                </button>
                <div className="text-center mb-6">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-${color}-500/20 border border-${color}-400/30 mb-2`}>
                        <BookOpen className={`w-5 h-5 text-${color}-400`} />
                        <span className={`text-${color}-400 font-bold text-xl`}>{title}</span>
                    </div>
                </div>
                <div className="grid grid-cols-5 gap-3 max-w-lg mx-auto">
                    {data.map((item, idx) => (
                        <div key={idx} className={`bg-white/10 backdrop-blur rounded-xl p-3 text-center border border-white/20 hover:bg-white/20 hover:border-${color}-400/50 transition-all`}>
                            <div className="text-2xl font-bold text-white">{item.char}</div>
                            <div className={`text-xs text-${color}-400`}>{item.romaji}</div>
                        </div>
                    ))}
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
                <div className="min-h-screen relative">
                    {/* Background */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${bgTraining})` }}
                    >
                        <div className="absolute inset-0 bg-slate-900/70" />
                    </div>

                    <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center max-w-md w-full border border-white/20 shadow-2xl">
                            {/* Score Icon */}
                            {percentScore >= 80 ? (
                                <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                            ) : percentScore >= 50 ? (
                                <Star className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                            ) : (
                                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            )}

                            <h2 className="text-2xl font-bold text-white mb-2">퀴즈 완료!</h2>
                            <div className={`text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${resultGradient} mb-2`}>
                                {score}/{quiz.length}
                            </div>
                            <p className="text-gray-400 mb-6 flex items-center justify-center gap-2">
                                {percentScore >= 80 ? (
                                    <><Trophy className="w-5 h-5 text-yellow-400" /> 훌륭해요!</>
                                ) : percentScore >= 50 ? (
                                    <><ThumbsUp className="w-5 h-5 text-green-400" /> 잘했어요!</>
                                ) : (
                                    <><Star className="w-5 h-5 text-gray-400" /> 다시 도전해봐요!</>
                                )}
                            </p>

                            <div className="space-y-3">
                                <button
                                    onClick={() => startQuiz(quizType)}
                                    className={`w-full py-3 bg-gradient-to-r ${resultGradient} text-white rounded-full font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2`}
                                >
                                    <RefreshCw className="w-5 h-5" /> 다시 도전
                                </button>
                                <button
                                    onClick={() => setTab('select')}
                                    className="w-full py-3 bg-white/10 backdrop-blur text-gray-300 rounded-full border border-white/20 hover:bg-white/20 transition-all"
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
                        <div className="grid grid-cols-2 gap-4 max-w-lg w-full">
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
                                        className={`p-5 rounded-2xl text-xl font-bold transition-all transform hover:scale-105 ${buttonClass}`}
                                    >
                                        {showResult && isCorrect && <span className="mr-2">✓</span>}
                                        {showResult && isSelected && !isCorrect && <span className="mr-2">✗</span>}
                                        {option}
                                    </button>
                                );
                            })}
                        </div>
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
            <div className="relative z-10 min-h-screen flex">
                {/* Left Side - Character */}
                <div className="hidden md:flex w-1/3 items-end justify-center pb-0">
                    <img
                        src={boyTrainingImg}
                        alt="Study Boy"
                        className="h-[80vh] object-contain drop-shadow-2xl rounded-3xl"
                    />
                </div>

                {/* Right Side - Training Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                    {/* Back Button */}
                    <button onClick={onBack} className="flex items-center gap-2 text-gray-300 hover:text-white mb-6 bg-slate-800/50 px-4 py-2 rounded-full">
                        <ArrowLeft className="w-5 h-5" /> 메인으로 돌아가기
                    </button>

                    <div className="text-center mb-6">
                        <Pencil className="w-10 h-10 text-purple-400 mx-auto mb-2" />
                        <h1 className="text-2xl font-bold text-white mb-1">트레이닝 센터</h1>
                        <div className="flex items-center justify-center gap-2 text-emerald-400">
                            <Zap className="w-4 h-4" />
                            <span className="text-sm">{energy}/5 에너지</span>
                        </div>
                    </div>

                    {/* Chart Section */}
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><BookOpen className="w-5 h-5 text-pink-400" /> 문자 학습</h2>
                        <div className="grid grid-cols-2 gap-3">
                            <button onClick={() => setTab('hiragana-chart')} className="p-4 bg-slate-800/80 rounded-xl border border-pink-400/30 hover:border-pink-400 transition-all">
                                <div className="text-3xl mb-1">あ</div>
                                <div className="font-medium text-white text-sm">히라가나 표</div>
                                <div className="text-xs text-gray-400">46자 암기</div>
                            </button>
                            <button onClick={() => setTab('katakana-chart')} className="p-4 bg-slate-800/80 rounded-xl border border-purple-400/30 hover:border-purple-400 transition-all">
                                <div className="text-3xl mb-1">ア</div>
                                <div className="font-medium text-white text-sm">가타카나 표</div>
                                <div className="text-xs text-gray-400">46자 암기</div>
                            </button>
                        </div>
                    </div>

                    {/* Quiz Section */}
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><Pencil className="w-5 h-5 text-purple-400" /> 퀴즈 도전</h2>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                            <button onClick={() => startQuiz('hiragana')} disabled={energy <= 0} className="p-4 bg-slate-800/80 rounded-xl border border-pink-400/30 hover:border-pink-400 transition-all disabled:opacity-50">
                                <div className="text-2xl mb-1">あ→a</div>
                                <div className="font-medium text-white text-sm">히라가나 퀴즈</div>
                            </button>
                            <button onClick={() => startQuiz('katakana')} disabled={energy <= 0} className="p-4 bg-slate-800/80 rounded-xl border border-purple-400/30 hover:border-purple-400 transition-all disabled:opacity-50">
                                <div className="text-2xl mb-1">ア→a</div>
                                <div className="font-medium text-white text-sm">가타카나 퀴즈</div>
                            </button>
                        </div>
                    </div>

                    {/* Stage Vocabulary */}
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><BookMarked className="w-5 h-5 text-amber-400" /> 스테이지 단어</h2>
                        <div className="space-y-3">
                            <button onClick={() => startQuiz('vocab-1')} disabled={energy <= 0} className="w-full p-4 bg-slate-800/80 rounded-xl border border-pink-400/30 hover:border-pink-400 transition-all disabled:opacity-50 text-left">
                                <div className="flex items-center gap-3">
                                    <img src={girl1Img} alt="하나" className="w-12 h-12 rounded-full object-cover border-2 border-pink-400/50" />
                                    <div>
                                        <div className="font-medium text-pink-400">Stage 1 - 하나</div>
                                        <div className="text-xs text-gray-400">기초 인사, 학교 단어</div>
                                    </div>
                                </div>
                            </button>
                            <button onClick={() => startQuiz('vocab-2')} disabled={energy <= 0} className="w-full p-4 bg-slate-800/80 rounded-xl border border-purple-400/30 hover:border-purple-400 transition-all disabled:opacity-50 text-left">
                                <div className="flex items-center gap-3">
                                    <img src={girl2Img} alt="미사키" className="w-12 h-12 rounded-full object-cover border-2 border-purple-400/50" />
                                    <div>
                                        <div className="font-medium text-purple-400">Stage 2 - 미사키</div>
                                        <div className="text-xs text-gray-400">존댓말, 감정 표현</div>
                                    </div>
                                </div>
                            </button>
                            <button onClick={() => startQuiz('vocab-3')} disabled={energy <= 0} className="w-full p-4 bg-slate-800/80 rounded-xl border border-amber-400/30 hover:border-amber-400 transition-all disabled:opacity-50 text-left">
                                <div className="flex items-center gap-3">
                                    <img src={girl3Img} alt="히나타" className="w-12 h-12 rounded-full object-cover border-2 border-amber-400/50" />
                                    <div>
                                        <div className="font-medium text-amber-400">Stage 3 - 히나타</div>
                                        <div className="text-xs text-gray-400">구어체, 카페 표현</div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* AI Pronunciation Practice */}
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><Mic className="w-5 h-5 text-emerald-400" /> AI 발음 연습</h2>
                        <button
                            onClick={() => setTab('pronunciation')}
                            className="w-full p-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl border border-emerald-400/30 hover:border-emerald-400 transition-all text-left"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-emerald-500/30 flex items-center justify-center">
                                    <Volume2 className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div>
                                    <div className="font-medium text-emerald-400">발음 분석 시작</div>
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
        <div className="min-h-screen relative">
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${bgTraining})` }}
            >
                <div className="absolute inset-0 bg-slate-900/50" />
            </div>

            <div className="relative z-10 min-h-screen p-6">
                {/* Back Button */}
                <button onClick={onBack} className="flex items-center gap-2 text-gray-300 hover:text-white mb-6 bg-white/10 backdrop-blur px-4 py-2 rounded-full border border-white/20">
                    <ArrowLeft className="w-5 h-5" /> 메인으로 돌아가기
                </button>

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="bg-white/10 backdrop-blur rounded-2xl p-6 inline-block border border-white/20">
                        <BookMarked className="w-12 h-12 text-amber-400 mx-auto mb-2" />
                        <h1 className="text-3xl font-bold text-white">틀린 단어 복습</h1>
                        <p className="text-gray-300">{wrongWords.length}개 단어 복습 필요</p>
                    </div>
                </div>

                {/* Wrong Words Section */}
                {wrongWords.length === 0 ? (
                    <div className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center max-w-md mx-auto border border-white/20">
                        <Star className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-white mb-2">완벽해요!</h2>
                        <p className="text-gray-300">틀린 단어가 없어요!<br />트레이닝 센터에서 퀴즈를 풀어보세요.</p>
                    </div>
                ) : (
                    <div className="max-w-lg mx-auto space-y-4">
                        {wrongWords.map((word, idx) => (
                            <div key={idx} className="bg-white/15 backdrop-blur rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="text-2xl font-bold text-white">{word.japanese}</div>
                                        <div className="text-gray-400 text-sm">{word.romaji}</div>
                                    </div>
                                    <div className="text-right flex-1">
                                        <div className="font-medium text-amber-300">{word.meaning}</div>
                                        <div className="text-xs text-gray-400">Stage {word.stage}</div>
                                    </div>
                                    <button
                                        onClick={() => removeWord(idx)}
                                        className="ml-3 p-2 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-400 transition-all"
                                        title="다 외웠어요!"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Clear All Button */}
                        <button
                            onClick={() => setWrongWords([])}
                            className="w-full py-3 bg-white/10 backdrop-blur rounded-full text-gray-300 hover:bg-white/20 border border-white/20 transition-all"
                        >
                            전체 지우기
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
