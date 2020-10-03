import React from "react";
import RecruitEdit from "../components/RecruitEdit";
import MenuEdit from "../components/MenuEdit";
import NoticeEdit from "../components/NoticeEdit";
import BanquetEdit from "../components/BanquetEdit";

const Edit = ({ history }) => {
  return (
    <>
      {/* <div class="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-16 mt-16">
        <div class="w-full lg:w-1/5 px-6 text-xl text-gray-800 leading-normal">
          <p class="text-base font-bold py-2 lg:pb-6 text-gray-700">
            編集メニュー
          </p>
          <div class="block lg:hidden sticky inset-0">
            <button
              id="menu-toggle"
              class="flex w-full justify-end px-3 py-3 bg-white lg:bg-transparent border rounded border-gray-600 hover:border-orange-600 appearance-none focus:outline-none"
            ></button>
          </div>
          <div
            class="w-full sticky inset-0 hidden max-h-64 lg:h-auto overflow-x-hidden overflow-y-auto lg:overflow-y-hidden lg:block mt-0 my-2 lg:my-0 border border-gray-400 lg:border-transparent bg-white shadow lg:shadow-none lg:bg-transparent z-20"
            style={{ top: "6em" }}
            id="menu-content"
          >
            <ul class="list-reset py-2 md:py-0">
              <li class="py-1 md:my-2 hover:bg-orange-100 lg:hover:bg-transparent border-l-4 border-transparent font-bold border-orange-600">
                <a
                  href="#section1"
                  class="block pl-4 align-middle text-gray-700 no-underline hover:text-orange-600"
                >
                  <span class="pb-1 md:pb-0 text-sm">Section 1</span>
                </a>
              </li>
              <li class="py-1 md:my-2 hover:bg-orange-100 lg:hover:bg-transparent border-l-4 border-transparent">
                <a
                  href="#section2"
                  class="block pl-4 align-middle text-gray-700 no-underline hover:text-orange-600"
                >
                  <span class="pb-1 md:pb-0 text-sm">Section 2</span>
                </a>
              </li>
              <li class="py-1 md:my-2 hover:bg-orange-100 lg:hover:bg-transparent border-l-4 border-transparent">
                <a
                  href="#section3"
                  class="block pl-4 align-middle text-gray-700 no-underline hover:text-orange-600"
                >
                  <span class="pb-1 md:pb-0 text-sm">Section 3</span>
                </a>
              </li>
              <li class="py-1 md:my-2 hover:bg-orange-100 lg:hover:bg-transparent border-l-4 border-transparent">
                <a
                  href="#section4"
                  class="block pl-4 align-middle text-gray-700 no-underline hover:text-orange-600"
                >
                  <span class="pb-1 md:pb-0 text-sm">Section 4</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div> */}
      <h1>
        <div style={{ display: "flex" }}>
          <button
            class="bg-white w-auto flex justify-end items-center text-blue-500 p-2 hover:text-blue-400"
            type="button"
            onClick={() => history.goBack()}
          >
            戻る
          </button>

          <button
            class="bg-white w-auto flex justify-end items-center text-blue-500 p-2 hover:text-blue-400"
            onClick={() => {
              history.push("/");
            }}
          >
            ホームページ表示
          </button>
        </div>
      </h1>
      <section class="w-full">
        <h1 class="flex items-center font-sans font-bold break-normal text-gray-700 px-2 text-xl mt-12 lg:mt-0 md:text-2xl">
          ホームページ編集
        </h1>
        <MenuEdit />
        <hr class="bg-gray-300 my-12" />
        <BanquetEdit />
        <hr class="bg-gray-300 my-12" />
        <RecruitEdit />
        <hr class="bg-gray-300 my-12" />
        <NoticeEdit />
      </section>
    </>
  );
};

export default Edit;
