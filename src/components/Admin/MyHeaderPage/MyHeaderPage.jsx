import React, { useState } from "react";
import { Button, Form, Input, Radio, Space, Typography } from "antd";
import { isEmpty, map, size } from "lodash";
import { useSizeScreen } from "../../../hooks";

import "./MyHeaderPage.scss";

export function MyHeaderPage(props) {
  const { title, btnOptions, inputOptions } = props;
  const { isTabletOrMobile } = useSizeScreen();
  return (
    <div className="my-header-page-admin">
      <Typography.Title level={2}>{title}</Typography.Title>
      <Space align="center" className="my-header-page-admin__actions">
        {size(inputOptions) > 0 && (
          <Space align="center" className="my-header-page-admin__inputs">
            {map(inputOptions, (input, index) => (
              <Form.Item
                key={index}
                label={!isTabletOrMobile ? input.title : null}
                tooltip="Presione Enter para ejecutar la búsqueda o haga clic en el botón de búsqueda"
              >
                <Input.Search
                  placeholder={input.title}
                  allowClear
                  enterButton="Buscar"
                  onBlur={(e) => input.onSearch(e.target.value)}
                  onSearch={(value) => input.onSearch(value)}
                  // onChange={(e) =>
                  //   !isEmpty(e.target.value) && input.onSearch(e.target.value)
                  // }
                />
                {size(input?.filters) > 0 && (
                  <>
                    {input?.filter.type === "search" && (
                      <Radio.Group
                        className="filter-radio-group"
                        onChange={input?.filter.set}
                        value={input?.filter.get}
                      >
                        {map(input.filters, (filter, indexFilter) => (
                          <Radio key={indexFilter} value={filter.value}>
                            {filter.content}
                          </Radio>
                        ))}
                      </Radio.Group>
                    )}
                  </>
                )}
              </Form.Item>
            ))}
          </Space>
        )}
        {size(btnOptions) > 0 && (
          <Space className="my-header-page-admin__buttons">
            {map(btnOptions, (btn, index) => (
              <Button
                key={index}
                icon={btn.icon}
                type={btn.type}
                onClick={btn.onClick}
              >
                {btn.title}
              </Button>
            ))}
          </Space>
        )}
      </Space>
    </div>
  );
}
