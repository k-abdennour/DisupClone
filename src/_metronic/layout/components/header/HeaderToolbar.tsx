/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "../../../../app/modules/auth";
import { useEffect, useState } from "react";
import noUiSlider, { target } from "nouislider";
import { useLayout } from "../../core";
import { KTIcon, toAbsoluteUrl } from "../../../helpers";
import { DefaultTitle } from "./page-title/DefaultTitle";
import { HeaderUserMenu, ThemeModeSwitcher } from "../../../partials";

const HeaderToolbar = () => {
  const { classes } = useLayout();
  const [status, setStatus] = useState<string>("1");
  const { currentUser } = useAuth();

  useEffect(() => {
    const slider: target = document.querySelector(
      "#kt_toolbar_slider"
    ) as target;
    const rangeSliderValueElement: Element | null = document.querySelector(
      "#kt_toolbar_slider_value"
    );

    if (!slider) {
      return;
    }

    slider.innerHTML = "";

    noUiSlider.create(slider, {
      start: [5],
      connect: [true, false],
      step: 1,
      range: {
        min: [1],
        max: [10],
      },
    });

    slider.noUiSlider?.on("update", function (values: any, handle: any) {
      if (!rangeSliderValueElement) {
        return;
      }

      rangeSliderValueElement.innerHTML = parseInt(values[handle]).toFixed(1);
    });
  }, []);

  return (
    <div className="toolbar d-flex align-items-stretch">
      {/* begin::Toolbar container */}
      <div
        className={`${classes.headerContainer.join(
          " "
        )} py-6 py-lg-0 d-flex flex-column flex-lg-row align-items-lg-stretch justify-content-lg-between`}
      >
        <DefaultTitle />
        <div className="mt-3">
          {/* begin::Action wrapper */}
          <div className="d-flex align-items-center">
            {/*begin::Symbol*/}
            <div className="symbol symbol-50px">
              <img src="/media/avatars/300-1.jpg" alt="" />
            </div>
            {/*end::Symbol*/}

            {/*begin::Wrapper*/}
            <div className="aside-user-info flex-row-fluid flex-wrap ms-5">
              {/*begin::Section*/}
              <div className="d-flex">
                {/*begin::Info*/}
                <div className="flex-grow-1 me-2">
                  {/*begin::Username*/}
                  <a
                    href="#"
                    className="text-dark text-hover-primary fs-6 fw-bold"
                  >
                    {currentUser?.first_name} {currentUser?.last_name}
                  </a>
                  {/*end::Username*/}

                  {/*begin::Description*/}
                  <span className="text-gray-600 fw-bold d-block fs-8 mb-1">
                    Python dev
                  </span>
                  {/*end::Description*/}

                  {/*begin::Label*/}
                  <div className="d-flex align-items-center text-success fs-9">
                    <span className="bullet bullet-dot bg-success me-1"></span>
                    online
                  </div>
                  {/*end::Label*/}
                </div>
                {/*end::Info*/}

                {/*begin::User menu*/}
                <div className="me-n2">
                  {/*begin::Action*/}
                  <a
                    href="#"
                    className="btn btn-icon btn-sm btn-active-color-primary mt-n2"
                    data-kt-menu-trigger="click"
                    data-kt-menu-placement="bottom-start"
                    data-kt-menu-overflow="false"
                  >
                    <KTIcon iconName="setting-2" className="text-muted fs-1" />
                  </a>

              {/* begin::Theme mode */}
              <div className='d-flex align-items-center'>
                <ThemeModeSwitcher toggleBtnClass='btn btn-sm btn-icon btn-icon-muted btn-active-icon-primary' />
              </div>
                  <HeaderUserMenu />
                  {/*end::Action*/}
                </div>
                {/*end::User menu*/}
              </div>
              {/*end::Section*/}
            </div>
            {/* end::Actions */}
          </div>
          {/* end::Action wrapper */}
        </div>
        {/* end::Toolbar container */}
      </div>
    </div>
  );
};

export { HeaderToolbar };
