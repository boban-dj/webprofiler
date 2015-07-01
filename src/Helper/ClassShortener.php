<?php

namespace Drupal\webprofiler\Helper;

use Drupal\Component\Utility\SafeMarkup;

/**
 * Class ClassShortener
 */
class ClassShortener implements ClassShortenerInterface {

  /**
   * {@inheritdoc}
   */
  public function shortenClass($class) {
    $parts = explode('\\', $class);
    $result = [];
    $size = count($parts) - 1;

    foreach($parts as $key => $part) {
      if ($key < $size) {
        $result[] = substr($part, 0 ,1);
      } else {
        $result[] = $part;
      }
    }

    return SafeMarkup::format("<abbr title=\"@class\">@short</abbr>", array('@class' => $class, '@short' => implode('\\', $result)));
  }
}
