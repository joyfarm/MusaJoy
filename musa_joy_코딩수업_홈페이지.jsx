import React, { useEffect, useMemo, useState } from "react";
import { Cpu, Microchip, Code2, Blocks, Puzzle, Sparkles, Mail, Phone, MapPin, ChevronRight } from "lucide-react";

const SECTIONS = [
  { id: "intro", label: "소개", icon: Sparkles },
  { id: "arduino", label: "아두이노", icon: Cpu },
  { id: "microbit", label: "마이크로비트", icon: Microchip },
  { id: "python", label: "파이썬", icon: Code2 },
  { id: "block", label: "블록코딩", icon: Blocks },
  { id: "unplugged", label: "언플러그드", icon: Puzzle },
];

function clsx(...parts) {
  return parts.filter(Boolean).join(" ");
}

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 88;
  window.scrollTo({ top: y, behavior: "smooth" });
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids?.[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
        if (visible[0]?.target?.id) setActive(visible[0].target.id);
      },
      {
        root: null,
        threshold: [0.1, 0.2, 0.3, 0.4, 0.5],
        rootMargin: "-20% 0px -65% 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

function Pill({ children, className }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-sm text-zinc-700 shadow-sm backdrop-blur",
        className
      )}
    >
      {children}
    </span>
  );
}

function Card({ title, icon: Icon, children, kicker }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-xl border border-zinc-200 bg-white p-2 shadow-sm">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          {kicker ? (
            <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              {kicker}
            </div>
          ) : null}
          <h3 className="mt-1 text-lg font-semibold text-zinc-900">{title}</h3>
        </div>
      </div>
      <div className="mt-4 text-sm leading-6 text-zinc-700">{children}</div>
    </div>
  );
}

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="scroll-mt-24 py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-3 text-base leading-7 text-zinc-600">{subtitle}</p>
          ) : null}
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

function MiniList({ items }) {
  return (
    <ul className="mt-4 space-y-2">
      {items.map((t, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-zinc-700">
          <ChevronRight className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function CTABox() {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-sm font-semibold text-zinc-900">수업 문의 / 협업</div>
          <div className="mt-1 text-sm text-zinc-600">
            학교·기관·동아리·방과후·캠프 등 맞춤 커리큘럼으로 진행합니다.
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("contact");
            }}
            className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-zinc-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
          >
            문의하기
          </a>
          <a
            href="#intro"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("intro");
            }}
            className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 shadow-sm transition hover:bg-zinc-50"
          >
            커리큘럼 보기
          </a>
        </div>
      </div>
    </div>
  );
}

export default function MusaJoyCodingClassSite() {
  const ids = useMemo(() => SECTIONS.map((s) => s.id), []);
  const active = useActiveSection(ids);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-50 text-zinc-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-zinc-200/70 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2"
          >
            <div className="grid h-9 w-9 place-items-center rounded-xl border border-zinc-200 bg-white shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="text-base font-semibold">MusaJoy</div>
              <div className="text-xs text-zinc-600">코딩수업 · 메이커교육</div>
            </div>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {SECTIONS.map(({ id, label, icon: Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(id);
                }}
                className={clsx(
                  "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition",
                  active === id ? "bg-zinc-900 text-white" : "text-zinc-700 hover:bg-zinc-100"
                )}
                aria-current={active === id ? "page" : undefined}
              >
                <Icon className="h-4 w-4" />
                {label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("contact");
            }}
            className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold shadow-sm transition hover:bg-zinc-50"
          >
            문의
          </a>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section className="py-12 sm:py-16">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
            <div>
              <div className="flex flex-wrap gap-2">
                <Pill>즐겁게 배우는 코딩</Pill>
                <Pill>메이커 · 문제해결</Pill>
                <Pill>초등~중등 추천</Pill>
              </div>
              <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                MusaJoy 코딩수업
                <span className="block text-zinc-600">만들며 배우고, 발표하며 성장해요.</span>
              </h1>
              <p className="mt-4 text-base leading-7 text-zinc-700">
                아두이노·마이크로비트·파이썬·블록코딩·언플러그드를 한 곳에서.
                흥미 → 원리 이해 → 프로젝트 제작 → 공유(발표)까지 이어지는 수업 흐름으로
                학생이 스스로 ‘할 수 있다’를 경험하도록 설계합니다.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#intro"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId("intro");
                  }}
                  className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
                >
                  커리큘럼 한눈에 보기
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId("contact");
                  }}
                  className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 shadow-sm transition hover:bg-zinc-50"
                >
                  수업 문의하기
                </a>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
                  <div className="text-xs font-semibold text-zinc-500">수업 형태</div>
                  <div className="mt-1 text-sm font-semibold">정규 · 방과후 · 캠프</div>
                </div>
                <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
                  <div className="text-xs font-semibold text-zinc-500">수업 방식</div>
                  <div className="mt-1 text-sm font-semibold">프로젝트 기반(PBL)</div>
                </div>
                <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
                  <div className="text-xs font-semibold text-zinc-500">결과물</div>
                  <div className="mt-1 text-sm font-semibold">작품 · 포트폴리오</div>
                </div>
              </div>
            </div>

            {/* Mascot */}
            <div className="relative">
              <div className="absolute -inset-6 rounded-[2rem] bg-zinc-100/70 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">마스코트</div>
                    <div className="mt-1 text-sm text-zinc-600">MusaJoy와 함께 시작해요</div>
                  </div>
                  <Pill className="text-xs">PNG / 투명배경 OK</Pill>
                </div>
                <div className="mt-6 grid place-items-center">
                  {/*
                    ✅ 이미지 사용 안내
                    - /public 폴더에 "부캐.png"로 저장하면 아래 경로로 표시됩니다.
                    - 파일명이 다르면 src만 바꿔주세요.
                  */}
                  <img
                    src="/부캐.png"
                    alt="MusaJoy 마스코트"
                    className="h-80 w-auto select-none object-contain"
                    draggable={false}
                  />
                </div>
                <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
                  <div className="font-semibold text-zinc-900">키워드</div>
                  <div className="mt-1">MusaJoy · 만들며 배우는 코딩 · 즐거운 프로젝트</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile nav */}
        <section className="border-y border-zinc-200 bg-white/60 backdrop-blur md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {SECTIONS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollToId(id)}
                  className={clsx(
                    "flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium",
                    active === id ? "bg-zinc-900 text-white" : "border border-zinc-200 bg-white text-zinc-700"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Sections */}
        <Section
          id="intro"
          title="소개"
          subtitle="‘재미’로 시작해 ‘이해’로 연결하고, ‘작품’으로 완성합니다. MusaJoy 수업은 단계별 성취감을 설계합니다."
        >
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Card title="수업 흐름" icon={Sparkles} kicker="Flow">
              <MiniList
                items={[
                  "흥미 유발(미션/퀴즈) → 핵심 개념(짧게) → 실습(바로) → 프로젝트(확장)",
                  "팀 활동/발표로 의사소통과 협업 역량까지 함께 기릅니다.",
                  "초급/중급/심화 레벨로 구성해 학년·수준별 맞춤 운영이 가능합니다.",
                ]}
              />
            </Card>
            <Card title="수업 목표" icon={Code2} kicker="Goal">
              <MiniList
                items={[
                  "컴퓨팅 사고(분해/패턴/추상화/알고리즘) 체화",
                  "문제해결력과 자기주도 학습 태도 강화",
                  "작품 제작을 통한 성취 경험과 포트폴리오 구축",
                ]}
              />
            </Card>
            <Card title="운영 옵션" icon={Blocks} kicker="Options">
              <MiniList
                items={[
                  "방과후/동아리: 8~16차시 구성",
                  "정규 수업: 성취기준 기반 맞춤 편성",
                  "캠프/특강: 하루~2박3일 프로젝트 집중형",
                ]}
              />
            </Card>
          </div>

          <div className="mt-4">
            <CTABox />
          </div>
        </Section>

        <Section
          id="arduino"
          title="아두이노"
          subtitle="센서·LED·모터를 연결해 ‘실제 세계’를 움직이는 코딩을 경험합니다."
        >
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Card title="핵심 개념" icon={Cpu} kicker="Core">
              <MiniList
                items={[
                  "입출력(LED/버튼), PWM, 아날로그 센서 읽기",
                  "시리얼 통신으로 데이터 확인/디버깅",
                  "조건/반복을 활용한 장치 제어",
                ]}
              />
            </Card>
            <Card title="추천 프로젝트" icon={Sparkles} kicker="Project">
              <MiniList
                items={[
                  "스마트 무드등(조도센서 + RGB LED)",
                  "미니 신호등/횡단보도(버튼 + 타이머)",
                  "거리 경보기(초음파 센서 + 부저)",
                ]}
              />
            </Card>
            <Card title="확장" icon={Microchip} kicker="Extend">
              <MiniList
                items={[
                  "서보/DC 모터로 움직임 구현",
                  "센서 데이터로 간단한 ‘스마트’ 기능 설계",
                  "팀별 아이디어를 제품처럼 발표/시연",
                ]}
              />
            </Card>
          </div>
        </Section>

        <Section
          id="microbit"
          title="마이크로비트"
          subtitle="LED 매트릭스, 버튼, 가속도, 라디오 통신까지—작고 강력한 보드로 빠르게 프로젝트를 완성합니다."
        >
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Card title="핵심 개념" icon={Microchip} kicker="Core">
              <MiniList
                items={[
                  "입력(버튼/흔들기/기울이기)과 출력(LED/사운드)",
                  "변수/조건/반복으로 게임 로직 만들기",
                  "라디오 통신으로 팀 게임/협업 미션",
                ]}
              />
            </Card>
            <Card title="추천 프로젝트" icon={Blocks} kicker="Project">
              <MiniList
                items={[
                  "LED 뱃지·표정 만들기",
                  "가속도 기반 미니 게임(피하기/달리기)",
                  "무선 퀴즈 버저(라디오 통신)",
                ]}
              />
            </Card>
            <Card title="활용 팁" icon={Sparkles} kicker="Tip">
              <MiniList
                items={[
                  "블록→파이썬 전환이 쉬워 ‘단계 상승’에 적합",
                  "완성 속도가 빨라 발표/피드백 시간을 충분히 확보",
                  "센서 + 스토리텔링으로 창의 프로젝트 구성",
                ]}
              />
            </Card>
          </div>
        </Section>

        <Section
          id="python"
          title="파이썬"
          subtitle="텍스트 코딩으로 사고를 정교하게—데이터, 자동화, 간단한 게임까지 확장합니다."
        >
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Card title="핵심 개념" icon={Code2} kicker="Core">
              <MiniList
                items={[
                  "변수/자료형/조건/반복/함수",
                  "리스트/딕셔너리로 데이터 다루기",
                  "디버깅 습관(출력/단계적 확인) 만들기",
                ]}
              />
            </Card>
            <Card title="추천 프로젝트" icon={Sparkles} kicker="Project">
              <MiniList
                items={[
                  "텍스트 RPG 또는 퀴즈 게임",
                  "간단한 계산기/자동 채점 도구",
                  "거북이 그래픽으로 패턴 아트",
                ]}
              />
            </Card>
            <Card title="심화 확장" icon={Cpu} kicker="Advanced">
              <MiniList
                items={[
                  "CSV/간단한 데이터 분석(수준에 맞춰)",
                  "파이썬으로 마이크로비트 제어 연계",
                  "프로젝트 구조화(모듈/함수 분리)"
                ]}
              />
            </Card>
          </div>
        </Section>

        <Section
          id="block"
          title="블록코딩"
          subtitle="엔트리/스크래치/메이크코드 등 블록 기반으로 ‘알고리즘’의 감각을 먼저 잡습니다."
        >
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Card title="왜 블록코딩인가" icon={Blocks} kicker="Why">
              <MiniList
                items={[
                  "문법 부담 없이 논리(조건·반복·이벤트)에 집중",
                  "즉시 실행/피드백으로 학습 몰입 유지",
                  "초등 저학년~중학년까지 폭넓게 적용",
                ]}
              />
            </Card>
            <Card title="추천 프로젝트" icon={Sparkles} kicker="Project">
              <MiniList
                items={[
                  "스토리/애니메이션 제작(장면 전환, 대사)",
                  "미니게임(점수, 난이도, 아이템)",
                  "AI/데이터 체험(가능한 도구 범위에서)",
                ]}
              />
            </Card>
            <Card title="텍스트 코딩으로 연결" icon={Code2} kicker="Bridge">
              <MiniList
                items={[
                  "‘블록의 의미’를 코드로 번역하는 활동",
                  "조건/반복/함수 개념을 동일 용어로 유지",
                  "파이썬·C계열로 자연스럽게 확장",
                ]}
              />
            </Card>
          </div>
        </Section>

        <Section
          id="unplugged"
          title="언플러그드"
          subtitle="컴퓨터 없이도 컴퓨팅 사고를 배우는 활동. 코딩 수업의 ‘이해’와 ‘협업’을 탄탄하게 만듭니다."
        >
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Card title="활동 예시" icon={Puzzle} kicker="Activity">
              <MiniList
                items={[
                  "알고리즘 카드로 ‘정렬/탐색’ 게임",
                  "조건문 미로 탈출(규칙 만들기)",
                  "디버깅 릴레이: 오류 찾고 고치기",
                ]}
              />
            </Card>
            <Card title="수업에 넣는 방식" icon={Sparkles} kicker="How">
              <MiniList
                items={[
                  "도입: 개념 맛보기(5~10분)",
                  "중간: 막힐 때 재정비(리셋 활동)",
                  "마무리: 발표/피드백 규칙 만들기",
                ]}
              />
            </Card>
            <Card title="효과" icon={Code2} kicker="Impact">
              <MiniList
                items={[
                  "수학적 사고·언어화 능력 강화",
                  "협업과 역할 분담 훈련",
                  "코딩 불안감을 낮추고 자신감 상승",
                ]}
              />
            </Card>
          </div>

          <div className="mt-4">
            <CTABox />
          </div>
        </Section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-24 py-14 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-sm">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">문의</h2>
                  <p className="mt-3 text-base leading-7 text-zinc-600">
                    아래 정보는 예시입니다. 실제 연락처/위치/폼 링크로 바꿔서 사용하세요.
                  </p>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-zinc-700">
                      <Mail className="h-4 w-4" />
                      <span>musa-joy@example.com</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-zinc-700">
                      <Phone className="h-4 w-4" />
                      <span>010-0000-0000</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-zinc-700">
                      <MapPin className="h-4 w-4" />
                      <span>전북 / 온라인 가능</span>
                    </div>
                  </div>

                  <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
                    <div className="font-semibold text-zinc-900">빠르게 상담하려면</div>
                    <MiniList
                      items={[
                        "대상: (학년/수준/인원)",
                        "형태: (정규/방과후/캠프) & 차시 수",
                        "희망 주제: (아두이노/마이크로비트/파이썬/블록/언플러그드)",
                      ]}
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                  <div className="text-sm font-semibold text-zinc-900">문의 폼 (예시)</div>
                  <form
                    className="mt-4 space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert("예시 폼입니다. 실제로는 구글폼/노션폼/서버 연동으로 바꿔주세요!");
                    }}
                  >
                    <div>
                      <label className="text-sm font-medium text-zinc-700">이름</label>
                      <input
                        className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:ring-2 focus:ring-zinc-300"
                        placeholder="성함"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-zinc-700">연락처</label>
                      <input
                        className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:ring-2 focus:ring-zinc-300"
                        placeholder="전화번호 또는 이메일"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-zinc-700">문의 내용</label>
                      <textarea
                        className="mt-1 min-h-[120px] w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:ring-2 focus:ring-zinc-300"
                        placeholder="희망 수업/차시/대상/일정 등을 적어주세요."
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
                    >
                      전송(예시)
                    </button>
                  </form>
                </div>
              </div>

              <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-zinc-200 pt-6 sm:flex-row sm:items-center">
                <div className="text-sm text-zinc-600">
                  © {new Date().getFullYear()} MusaJoy. All rights reserved.
                </div>
                <div className="text-sm text-zinc-600">Made with 💡 for joyful coding.</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
