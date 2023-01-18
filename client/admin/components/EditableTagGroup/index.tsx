import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Tag, Input } from 'antd';

export default class EditableTagGroup extends React.Component<any, any> {
    input: any;
    static getDerivedStateFromProps(nextProps) {
        // Should be a controlled component.
        if ('value' in nextProps) {
            return {
                tags: nextProps.value || [],
            };
        }
        return null;
    }

    constructor(props) {
        super(props);
        this.state = {
            tags: props.value || [],
            inputVisible: false,
            inputValue: '',
        };
    }

    handleClose = (removedTag) => {
        const tags = this.state.tags.filter((tag) => tag !== removedTag);
        this.setState({ tags });
        this.triggerChange(tags);
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    };

    triggerChange = (tags) => {
        // Should provide an event to pass value to Form.
        const { onChange } = this.props;
        if (onChange) {
            onChange(tags);
        }
    };

    handleInputConfirm = () => {
        const { inputValue } = this.state;
        let { tags } = this.state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        this.triggerChange(tags);
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
    };

    saveInputRef = (input) => (this.input = input);

    forMap = (tag) => {
        const tagElem = (
            <Tag
                closable
                onClose={(e) => {
                    e.preventDefault();
                    this.handleClose(tag);
                }}
            >
                {tag}
            </Tag>
        );
        return (
            <span key={tag} style={{ display: 'inline-block' }}>
                {tagElem}
            </span>
        );
    };

    render() {
        const { tags, inputVisible, inputValue } = this.state;
        const tagChild = tags.map(this.forMap);
        return (
            <div>
                {this.state.tags.length > 0 && <div style={{ marginBottom: 16 }}>{tagChild}</div>}
                {inputVisible && (
                    <Input
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                )}
                {!inputVisible && (
                    <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
                        <PlusOutlined /> 新建标签
                    </Tag>
                )}
            </div>
        );
    }
}
