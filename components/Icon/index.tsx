import React from 'react';
import {Image,Text, ImageStyle, ImageSourcePropType} from 'react-native';
import variables from '../../common/styles/variables';

const iconMap = {
  'angle-down': require('../../common/images/icons/angle-down.png'),
  'angle-up': require('../../common/images/icons/angle-up.png'),
  'angle-left': require('../../common/images/icons/angle-left.png'),
  'angle-right': require('../../common/images/icons/angle-right.png'),
  'check': require('../../common/images/icons/check.png'),
  'star': require('../../common/images/icons/star.png'),
  'angle-double-left': require('../../common/images/icons/angle-double-left.png'),
  'angle-double-right': require('../../common/images/icons/angle-double-right.png'),
  'camera-o': require('../../common/images/icons/camera-o.png'),
  'check-circle': require('../../common/images/icons/check-circle.png'),
  'clock-o': require('../../common/images/icons/clock-o.png'),
  'cog-o': require('../../common/images/icons/cog-o.png'),
  'edit-o': require('../../common/images/icons/edit-o.png'),
  'ellipsis-h': require('../../common/images/icons/ellipsis-h.png'),
  'envelope-o': require('../../common/images/icons/envelope-o.png'),
  'exclamation-circle-o': require('../../common/images/icons/exclamation-circle-o.png'),
  'external-link': require('../../common/images/icons/external-link.png'),
  'home-o': require('../../common/images/icons/home-o.png'),
  'minus': require('../../common/images/icons/minus.png'),
  'picture-o': require('../../common/images/icons/picture-o.png'),
  'plus-circle-o': require('../../common/images/icons/plus-circle-o.png'),
  'plus-square-o': require('../../common/images/icons/plus-square-o.png'),
  'plus': require('../../common/images/icons/plus.png'),
  'question-circle-o': require('../../common/images/icons/question-circle-o.png'),
  'question-circle': require('../../common/images/icons/question-circle.png'),
  'search': require('../../common/images/icons/search.png'),
  'star-half-o': require('../../common/images/icons/star-half-o.png'),
  'star-o': require('../../common/images/icons/star-o.png'),
  'th-large-o': require('../../common/images/icons/th-large-o.png'),
  'times-circle-o': require('../../common/images/icons/times-circle-o.png'),
  'times-circle': require('../../common/images/icons/times-circle.png'),
  'times': require('../../common/images/icons/times.png'),
  'trash-o': require('../../common/images/icons/trash-o.png'),
  'user-o': require('../../common/images/icons/user-o.png')
};

export interface IconProps {
  style?: ImageStyle;
  type?: string;
  size?: number | string | null | undefined;
  tintColor?: string | null | undefined; // Android 平台无效
  source?: ImageSourcePropType;
}

export class Icon extends React.Component<IconProps, any> {
  static displayName = 'Icon';
  static defaultProps = {
    type: 'angle-down',
    size: 14,
    style: {},
    tintColor: variables.mtdBrandPrimaryDark,
    source: null,
  };

  render() {
    let {type, size, style, tintColor, source} = this.props;

    const mainStyle = {
      tintColor,
      width: size,
      height: size,
    };

    if (size == null) {
      delete mainStyle.width;
      delete mainStyle.height;
    }

    if (!source) {
      // source = require(`../../common/images/icons/${type}.png`);
      source = iconMap[type] || iconMap['angle-down'];
    }

    return (
      <Image
        style={[
          style,
          {
            ...mainStyle,
          },
        ]}
        source={source}
      />
    );
  }
}
