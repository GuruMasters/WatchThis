import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button as RNButton } from './Button';

interface HeroWTProps {
  titleTop?: string;
  titleAccent?: string;
  titleBottom?: string;
  description?: string;
}

const BRAND_YELLOW = '#FBC314';
const HERO_BLUE = '#001F3F';
const BRAND_WHITE = '#FFFFFF';
const BRAND_BLACK = '#111111';

export const HeroWT: React.FC<HeroWTProps> = ({
  titleTop = 'WATCH YOUR',
  titleAccent = 'BRAND',
  titleBottom = 'GOES WHOOSH!',
  description = 'We blend creativity and strategy to make your brand impossible to ignore. Ready to take down the competition?',
}) => {
  return (
    <View style={styles.wrapper}>
      {/* Watermark */}
      <Text accessibilityElementsHidden importantForAccessibility="no" style={styles.watermark}>
        WATCHTHIS
      </Text>

      <View style={styles.container}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Leading Digital Agency for Enterprise Business</Text>
        </View>

        <Text style={styles.title}>
          {titleTop} <Text style={styles.accent}>{titleAccent}</Text>
          {'\n'}
          {titleBottom}
        </Text>

        <Text style={styles.description}>{description}</Text>

        <View style={styles.ctaRow}>
          <RNButton
            title="Schedule a Call"
            variant="primary"
            size="lg"
            onPress={() => {}}
          />
          <RNButton
            title="Contact"
            variant="neutral"
            size="lg"
            onPress={() => {}}
          />
        </View>
      </View>

      {/* Yellow angled wedge */}
      <View style={styles.yellowWedge} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: HERO_BLUE,
    position: 'relative',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  container: {
    position: 'relative',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  badgeText: {
    color: BRAND_WHITE,
    fontSize: 12,
    fontWeight: '500',
  },
  title: {
    color: BRAND_WHITE,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '900',
  },
  accent: {
    color: BRAND_YELLOW,
  },
  description: {
    marginTop: 12,
    color: 'rgba(255,255,255,0.85)',
    fontSize: 16,
    lineHeight: 22,
  },
  ctaRow: {
    flexDirection: 'row',
    gap: 12 as any,
    marginTop: 16,
  },
  watermark: {
    position: 'absolute',
    right: -20,
    top: -10,
    color: BRAND_WHITE,
    opacity: 0.07,
    fontSize: 88,
    fontWeight: '900',
    transform: [{ rotate: '-10deg' }],
    letterSpacing: 4,
  },
  yellowWedge: {
    position: 'absolute',
    bottom: -24,
    left: 0,
    width: '70%',
    height: 48,
    backgroundColor: BRAND_YELLOW,
    transform: [{ skewY: '-8deg' }],
  },
});

export default HeroWT;


